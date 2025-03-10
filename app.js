const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Says to import a function which can the 
require('./startup/routes')(app);

const PORT = process.env.PORT;

app.listen(PORT, () => console.info(`App is running on PORT: ${PORT}`));
app.on("App Connection Error", (err) => console.error(`Connection Error: ${err}`));
