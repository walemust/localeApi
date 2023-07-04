require("dotenv").config();

const CONFIG = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    redis_url: process.env.REDIS_URL,
    test_mongo_uri: process.env.TEST_MONGO_URI,
    host_url: process.env.HOST_URL,
}

module.exports = CONFIG;