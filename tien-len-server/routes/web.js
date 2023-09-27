const express = require('express')
const path = require('path');

webRouter = express.Router()

// Public Routing
webRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
webRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});
webRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

webRouter.get("/healthCheck", (req, res) => {
    res.send('Health Check: OK')
})
module.exports = webRouter 