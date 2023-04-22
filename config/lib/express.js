
const bodyParser = require('body-parser'),
    compress = require('compression'),
    express = require('express'),
    helmet = require('helmet'),
    logger = require('./logger.js'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    cors = require("cors");
const app = express();
global.HttpStatus = require('http-status-codes');

// Showing stack errors
app.set('showStackError', true);

// Enable jsonp
app.enable('jsonp callback');

// Should be placed before express.static
app.use(compress({
    filter: function (req, res) {
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// Enable logger (morgan)
app.use(morgan(logger.getFormat(), logger.getOptions()));

// Request body parsing middleware should be above methodOverride
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(bodyParser.json({
    limit: '88mb'
}));
app.use(bodyParser.urlencoded({
    limit: '80mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(methodOverride());

// Use helmet to secure Express headers
app.use(helmet.xssFilter());
app.use(helmet.hsts({
    maxAge: 15778476000,
    includeSubDomains: true,
    force: true
}));
app.disable('x-powered-by');

module.exports.app = app;