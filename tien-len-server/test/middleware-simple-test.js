var http = require('http');
const express = require('express');

const app = express();

app.use(function (req, res, next) {
    console.log(`That's my first middleware.`);
    next();
});

app.use(function (req, res, next) {
    console.log(`That's my second middleware.`);
    next();
});

app.use(function (req, res, next) {
    console.log(`That's my third middleware.`);
    next();
});


http.createServer(app).listen(3000);