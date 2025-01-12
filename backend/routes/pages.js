const express = require('express');
const prisma = require('../prisma-client')
const router = express.Router();
const lunr = require('lunr');

// In-memort Lunr index
let idx = null;

// Function to build the Lunr index
const buildIndex = async () => {
    const pages = await prisma.page.findMany();
    idx = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('content');

        pages.forEach(page => {
            this.add(page);
        });
    });
};

// Initialize the index
buildIndex();

// Create a new page
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    try {
        const page = await prisma.page.create({
            data: { title, content }
        });

        // Rebuild index
        await buildIndex();
        res.status(201).json(page);
    } catch (err) {
        res.status(500).json({ message: 'Error creating page' });
    }
});

// Get all pages
router.get('/', async (req, res) => {
    try {
        const pages = await prisma.page.findMany();
        res.json(pages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pages' });
    }
});

// Search pages
router.get('/server', async (req, res) => {
    const { q } = req.query;

    if (!idx) {
        return res.status(500).json({ message: 'Search index not initialized' });
    }

    const results = idx.search(q);
    const pageIds = results.map(result => parseInt(result.ref));

    try {
        const pages = await prisma.page.findMany({
            where: { id: { in: pageIds }}
        });
        res.json(pages);
    } catch (err) {
        res.status(500).json({ message: 'Error searching pages' });
    }
});

// Get a single page by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const page = await prisma.page.findUnique({ where: { id: parseInt(id) }});

        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching page' });
    }
});

// Update a page
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const page = await prisma.page.update({
            where: { id: parseInt(id) },
            data: { title, content }
        });

        // Rebuild the index
        await buildIndex();
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: 'Error updating page' });
    }
});

// Delete a page
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.page.delete({ where: { id: parseInt(id) }});

        // Rebuild the index
        await buildIndex();
        res.json({ message: 'Page deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting page' });
    }
});

module.exports = router;