const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// When a request is made to the /users or /posts path, it will be directed to the index.js in the /api folder.
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
