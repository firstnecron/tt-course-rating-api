const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	postedOn: {
		type: Date,
		default: Date.now
	},
	rating: {
		type: Number,
		min: 1,
		max: 5
	},
	review: String
});

const CourseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	estimatedTime: String,
	materialsNeeded: String,
	steps: [{
		stepNumber: Number,
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	}],
	reviews: [mongoose.Schema.Types.ObjectId]
});
