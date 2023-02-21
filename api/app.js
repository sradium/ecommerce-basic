const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const httpLogger = require('./src/httpLogger');
const errors = require('./src/errors');
const createError = require('http-errors');

// Routes
const routerV1 = require('./src/routes');
const logger = require('./src/logger');

const app = express();

// Loggers
app.use(httpLogger)


// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Security
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());

// Routes
app.use('/api/v1', routerV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.warn('404 Not Found');
  next(createError(404));
});

// error handler
app.use(errors.errorMiddleware);

module.exports = app;
