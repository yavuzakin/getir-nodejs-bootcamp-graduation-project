const express = require('express');
const loaders = require('./loaders');
const config = require('./config');
const recordRouter = require('./routes/recordRoutes');
const ApiError = require('./scripts/utils/ApiError');
const errorHandler = require('./middlewares/errorHandler');

config();
loaders();

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());

// Route
app.use('/api/v1/records', recordRouter);

// Catch undefined routes and throw an error
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;