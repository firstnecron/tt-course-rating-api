const express = require('express');

const router = new express.Router();

const userRoutes = require('./users');
router.use('/users', userRoutes);

module.exports = router;
