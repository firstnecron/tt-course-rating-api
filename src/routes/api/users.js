const express = require('express');

const middleware = require('../../middleware');
const User = require('../../models').User;

const router = new express.Router();

router.get('/', middleware.authenticate, (req, res) => {
	return res.json(req.user);
});

router.post('/', (req, res, next) => {
	if (req.body.fullName &&
	req.body.emailAddress &&
	req.body.password &&
	req.body.confirmPassword) {
		if (req.body.password !== req.body.confirmPassword) {
			const error = new Error('Passwords do not match.');
			error.status = 400;
			return next(error);
		}

		const userData = {
			fullName: req.body.fullName,
			emailAddress: req.body.emailAddress,
			password: req.body.password
		};

		User.create(userData, error => {
			if (error) {
				return next(error);
			}

			return res.redirect('/');
		});
	} else {
		const error = new Error('All fields required');
		error.status = 400;
		return next(error);
	}
});

module.exports = router;
