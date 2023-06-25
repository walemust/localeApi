const Cache = require("../CONFIG/redis.config");

const  cacheMiddleware = async(req, res, next) =>{
    const  cacheKey = req.originalUrl.toLowerCase();
    const  cacheValue  = await Cache.redis.get(cacheKey);
       if(cacheValue != null){   
           return res.status(200).json(JSON.parse(cacheValue))           
       }else{
           next()        
       }      
}

module.exports = cacheMiddleware;
  