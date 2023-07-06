const User = require("../../model/auth.model");
const asyncHandler = require("../middlewares/AsyncHandler");
const CustomError = require("../error/customError");


const validateApiKey = asyncHandler(async (req, res, next) => {
    console.log("got here")
    try {
        const authHeader = req.headers.authorization;
        //i have no api key
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new CustomError("No Api Key found!", 400)
            return next(error)
        }

        const apiKey = authHeader.split(" ")[1]
        const validate = await User.findOne({ apiKey });
        if (!validate) {
            const error = new CustomError("Invalid Api Key!", 401)
            return next(error)
        }
        next()
    } catch (error) {

    }



})

module.exports = validateApiKey;


