const express = require('express');

const middleware = require('../../middleware');

const router = new express.Router();

router.get('/', (req, res) => {

});

router.post('/', middleware.authenticate, (req, res) => {

});

router.get('/:courseId', (req, res) => {

});

router.put('/:courseId', middleware.authenticate, (req, res) => {

});

module.exports = router;
