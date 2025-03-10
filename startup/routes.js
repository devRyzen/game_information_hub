const express = require('express');
const gameDev = require('../routes/gameDev');
const gamePub = require('../routes/gamePub');
const gameTitle = require('../routes/gameTitle');
const router = require(express.Router());

module.exports.appRoutes = function(app) {
    // Export for JSON pasing for access to req.body
    app.use(express.json());

    // Exporting of all seperate routes to app
    app.use('/games', gameTitle);
    app.use('/developer', gameDev);
    app.use('/publisher', gamePub);
}
