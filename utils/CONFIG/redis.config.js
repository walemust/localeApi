const Redis = require('redis');
const CONFIG = require("./env.config");
class Cache {
    constructor() {
        this.redis = null
    }
    async connect() {
        try {
            this.redis = await Redis.createClient({
                // password: 'Progress24?!',
                // socket: {
                //     host: 'redis-11991.c1.us-east1-2.gce.cloud.redislabs.com',
                //     port: 11991
                // }
                url: CONFIG.redis_url
            });
            this.redis.connect()
            this.redis.on("connect", () => console.log('redis connected'))
            this.redis.on('error', (err) => console.log('Redis Client Error', err));

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new Cache();

