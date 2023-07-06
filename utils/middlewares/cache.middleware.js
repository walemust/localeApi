const Cache = require("../CONFIG/redis.config");

const cacheMiddleware = async (req, res, next) => {
    //console.log("im here nw")
    const cacheKey = req.originalUrl.toLowerCase();
    const cacheValue = await Cache.redis.get(cacheKey);
    // console.log(cacheValue)
    if (cacheValue != null && cacheValue.length > 0) {
        return res.status(200).json(JSON.parse(cacheValue))
    } else {
        next()
    }
}

module.exports = cacheMiddleware;
