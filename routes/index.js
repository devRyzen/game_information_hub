const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200);
        res.send({
            message: "This is the root."
        })
        return;
    } catch (err) {
        res.status(500).send ({
            message: "Could not reach page."
        })
    }
})

module.exports = router;