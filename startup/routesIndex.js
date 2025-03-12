const express = require('express');
const gameDev = require('../routes/gameDev');
const gamePub = require('../routes/gamePub');
const gameTitle = require('../routes/gameTitle');
const home = require('../routes/index');

const router = express.Router();

router
    .use('/home', home)
    .use('/games', gameTitle)
    .use('/developers', gameDev)
    // .use('/publisher', gamePub);

module.exports = router;