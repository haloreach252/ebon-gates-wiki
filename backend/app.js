const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const initializePassport = require('./passport-config');
const prisma = require('./prisma-client');
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:2222',
    credentials: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport
initializePassport(passport, prisma);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});