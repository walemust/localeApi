const User = require("../../model/auth.model");
const asyncHandler = require("../middlewares/AsyncHandler");


const validateApiKey = asyncHandler( async(req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
        throw new Error('Invalid Authentication')
    }

    const apiKey = authHeader.split(" ")[1]
        const validate =  await User.findOne({apiKey});
        if(!validate){
            return res.status(401).json({errorMessage: `Invalid Api Key!`})
        }
        next()
    
    
})

module.exports = validateApiKey;


