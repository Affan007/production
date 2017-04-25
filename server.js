// require modules =============================================================================================
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// initilize variables =========================================================================================
const app = express();
const port = process.env.PORT || 3000;
const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') { return res.redirect(['https://', req.get('Host'), req.url].join('')); }
        next();
    }
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/'));

// routes ======================================================================================================
// app.use('/api/',require('./routes/post.js'));
app.use('/*', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

// start server ======================================================================================================
app.listen(port, () => console.log('Server is live on port : ', port));
