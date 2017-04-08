'use strict';

// Load modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/course-api');
const db = mongoose.connnection;

const app = express();

// Mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connection to database successful');
});

// Set our port
app.set('port', process.env.PORT || 5000);

// Morgan gives us http request logging
app.use(morgan('dev'));

// Setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// Catch 404 and forward to global error handler
app.use((req, res, next) => {
	const err = new Error('File Not Found');
	err.status = 404;
	next(err);
});

// Express's global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// Start listening on our port
const server = app.listen(app.get('port'), () => {
	console.log('Express server is listening on port ' + server.address().port);
});
