const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma-client');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { username }});
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully' });
})

// Logout route
router.post('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out successfully' });
})

// Get current user
router.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not Authenticated' });
    }
});

module.exports = router;