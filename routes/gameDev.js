const express = require('express');
const redisClient = require("../database_config/redis")
let router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    let developer = req.query.developer; // adds '/developer?developer=<developer>'
    let slug;
    let result;
    let isCached;

    if (!developer) {
        res.status(400).send ({
            message: "Please enter the game developer you'd like in search query. Example: https://localhost:3000/developers?developer=Rockstar Games"
        })
        return;
    }

    slug = developer.trim().split(' ').join('-').toLowerCase();

    try {
        // First check cache
        const cachedData = await redisClient.get(slug) // awaits on Promise (developer) before checking/parsing
        if (cachedData) {
            isCached = true;
            result = JSON.parse(cachedData);
            console.log('Search was found in cache');
        } else {
            const url = `${process.env.URL_RAWG}/developers/${slug}?key=${process.env.API_KEY}`;
            const response = await axios.get(url);
            result = response.data;
            console.log(`Fetch from API: ${url}`);

            if (!result || Object.keys(result).length === 0) {
                res.status(400).send ({
                    message: "API returned empty data array!"
                })
                return;
            }
        }
        // Cache new game data
        await redisClient.set(slug, JSON.stringify(result), {
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