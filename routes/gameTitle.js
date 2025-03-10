const express = require('express');
const redisClient = require("../database_config/redis")
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    try {
        res.status(200);
        res.send({
            message: "This is the game search root."
        })
        return;
    } catch (err) {
        res.status(500).send ({
            message: "Could not reach page."
        })
    }
})

router.get('/search', async (req, res) => {
    let title = req.query.title; // adds '/games/search?title=<title>'
    let result;
    let isCached;

    if (!title) {
        res.status(400).send ({
            message: "Please enter the title of the game you want."
        })
        return;
    }

    try {
        // First check cache
        const cachedData = await redisClient.get(title) // awaits on Promise (title) before checking/parsing
        if (cachedData) {
            isCached = true;
            result = JSON.parse(cachedData);
            console.log('Search was found in cache');
        } else {
            const url = `${process.env.URL_RAWG}/games?${process.env.API_KEY}&name=${title}`;
            const response = await axios.get(url);
            result = response.data;
            console.log('Search used API');

            if (result === 0) {
                res.status(400).send ({
                    message: "API returned empty data array!"
                })
                return;
            }
        }
        // Cache new game data
        await redisClient.set(location, JSON.stringify(result), {
            EX: 300,
            NX: true,
        })

        res.status(200).send ({
            isCached,
            result,
        })

    } catch (err) {
        res.status(500).send ({
            message: err.message
        })
    }
})

module.exports = router;
