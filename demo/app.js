var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '/src/client')));

/**
 * replace with your config
 */
var mediaPlatform = require('./src/facades/media-platform-facade').init({
    domain: 'wixmp-410a67650b2f46baa5d003c6.appspot.com',
    appId: '48fa9aa3e9d342a3a33e66af08cd7fe3',
    sharedSecret: 'fad475d88786ab720b04f059ac674b0e'
}).mediaPlatorm;

require('./src/routes/index')(app);
require('./src/routes/files')(app);
require('./src/routes/authentication')(app);


app.use(function(req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;