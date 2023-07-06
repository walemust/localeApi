const User = require("../../model/auth.model");
const asyncHandler = require("../middlewares/AsyncHandler")
const CustomError = require("../error/customError");


const validateApiKey = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const error = new CustomError("No Api Key found!", 400)
        return next(error)
    }

    const apiKey = authHeader
    // console.log(apiKey)
    const validate = await User.findOne({ apiKey });
    if (!validate) {
        const error = new CustomError("Invalid Api Key!", 401)
        return next(error)
    }
    next()


})

module.exports = validateApiKey;


