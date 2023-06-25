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



// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
//         throw new Error('Invalid Authentication')
//     }
    

//     const token = authHeader.split(" ")[1];
//     // console.log(token)

//     try {
//         const payload = jwt.verify(token, CONFIG.jwt_secret)

//         //useful when attaching the user[author] to the protected articles route
//         // req.user = {userID : payload.userID, email : payload.email, username : payload.username}
//         next()

//     } catch (error) {
//         throw new Error('Invalid Authentication')

//     }
// }

// module.exports = authenticate