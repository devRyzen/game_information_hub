const { createClient } = require('redis');

let client;

(async () => {
    if (!client) {
        client = createClient({
            socket: {
                host: process.env.HOST,
                port: process.env.PORT_REDIS,
            }
        })
        console.info('Connecting to Redis client...');

        client.on('error', (err) => console.error(`Redis client error: ${err}`));
        client.on('connect', () => console.info('Redis client connected!'));

        await client.connect();
    }
})();

module.exports = client;