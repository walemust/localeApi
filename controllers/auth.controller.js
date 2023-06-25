const User = require("../model/auth.model");
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../utils/middlewares/AsyncHandler');
const CustomError = require("../utils/error/customError");


// Registration
exports.registerUser = asyncHandler( async(req, res, next) => {
    const {
        username,
        email, 
        password} = req.body

    if( !username || !email   || ! password){
        // return res.status(400).send({message: `incomplete details, fill in all your details`})

        const error = new CustomError("incomplete details, fill in all your details", 400);
        return next(error); 
       
       
    }
        const alreadyExist = await User.findOne({ email});
        if(alreadyExist){
             const error = new CustomError("Email already Exist, Please try with a new email", 401);
            return next(error);
       
          }
         
          const user = new User ({
            username,
            email,
            password,
            apiKey: uuidv4()
          });

         await user.save();
         res.status(201).send({
            success: true,
            message: "Registration completed!!!, Make sure you keep your API KEY Safe!",
            user: {
                id:user._id,
                username: user.username,
                email: user.email,
                apiKey: user.apiKey
            }
         })
  
})

//Login

exports.login = asyncHandler( async( req, res, next ) => {
    const { email, password } = req.body;

    if( !email || !password){
       
        const error = new CustomError("incomplete details, enter all fields", 400);
        return next(error); 
    }
     
        const user  = await  User.findOne({ email })

        if(!user){
            const error = new CustomError("Invalid Information. Enter a registered email", 401);
            return next(error);
        }
        
        const passwordValidation = await user.isPasswordValid(password);
        if(!passwordValidation){
            
            const error = new CustomError("Incorrect password!", 401);
            return next(error);
        }

        return res.status(200).send({
            success: true,
            message: "login Successful"
        })

})
