const CONFIG = require("../CONFIG/env.config");
const User = require("../model/auth.model");




const validateApiKey = (async (req, res, next) =>{
    const apiKey = req.query.apiKey
    try {
        if(!apiKey){
            return res.status(401).json({errorMessage: `You're authorized! Kind add your "apiKey" as a query`})
        }
        const validate =  await User.findOne({apiKey});
        if(!validate){
            return res.status(401).json({errorMessage: `Invalid Api Key!`})
        }
        next()
    
    } catch (error) {
        console.error(error)
    }
    
})


module.exports = validateApiKey;