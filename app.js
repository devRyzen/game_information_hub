require('dotenv').config();
const express = require('express');
const axios = require('axios');
const apiRouter = require('./startup/routesIndex');

const app = express();

app.use(express.json());
app.use('/', apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.info(`App is running on PORT: ${PORT}`));
app.on("App Connection Error", (err) => console.error(`Connection Error: ${err}`));
