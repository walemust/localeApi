const CustomError = require("./customError");

module.exports = (req, res, next) =>{
    const err = new CustomError(`Cannot find ${req.originalUrl} on the server`, 404)
    next(err)
 }