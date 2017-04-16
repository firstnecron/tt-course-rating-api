const express = require('express');

const Course = require('../../models').Course;
const middleware = require('../../middleware');
const Review = require('../../models').Review;

const router = new express.Router();

router.get('/', (req, res, next) => {
	Course.find({})
		.select('title')
		.exec((error, courses) => {
			if (error) {
				return next(error);
			}

			return res.json(courses);
		});
});

router.post('/', middleware.authenticate, (req, res, next) => {
	Course.create(req.body, error => {
		if (error) {
			return next(error);
		}

		res.location('/');
		return res.end();
	});
});

router.get('/:courseId', (req, res, next) => {
	Course.findById(req.params.courseId)
		.populate({
			path: 'user',
			select: 'fullName'
		})
		.populate('reviews')
		.deepPopulate('reviews.user', {
			populate: {
				'reviews.user': {
					select: 'fullName'
				}
			}
		})
		.exec((error, course) => {
			if (error) {
				return next(error);
			}

			return res.json(course);
		});
});

router.put('/:courseId', middleware.authenticate, (req, res, next) => {
	Course.findByIdAndUpdate(req.params.courseId, {$set: req.body}, error => {
		if (error) {
			return next(error);
		}

		return next();
	});
});

router.post('/:courseId/reviews', middleware.authenticate, (req, res, next) => {
	Course.findById(req.params.courseId, (error, course) => {
		if (error) {
			return next(error);
		}

		// Ensure review user is not the owner of the course
		if (req.user._id === course.user) {
			const error = new Error('Course owner cannot be reviewer.');
			error.status = 401;
			return next(error);
		}

		Review.create(req.body, (error, review) => {
			if (error) {
				return next(error);
			}

			course.reviews.push(review._id);
			course.save(error => {
				if (error) {
					return next(error);
				}

				return next();
			});
		});
	});
});

module.exports = router;
