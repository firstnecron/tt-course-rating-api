'use strict';

// Load modules
const express = require('express');
const morgan = require('morgan');

const app = express();

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
