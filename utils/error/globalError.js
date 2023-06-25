const CustomError = require("./customError");

//development error function
const devErrors = (res, error) =>{
   res.status(error.statusCode).json({
      status : error.statusCode,
      message: error.message,
      stackTrace : error.stack,
      error: error
     })
}




//production error function
const prodErrors = (res, error) =>{
   //when error is an 'Operation error' - meaning when the error was caught by our function 
   if(error.isOperational){
      res.status(error.statusCode).json({
         status : error.statusCode,
         message: error.message
      })
   //when error is a' non-operational/ programming error' - meaning mongoose error validation handled it. before it could get to the global error handler
   }else{
      res.status(500).json({
         status: 'error',
         messsage: 'something went wrong'
      })
   }
}

module.exports = (error, req, res, next)=>{
error.statusCode = error.statusCode || 500;
error.status = error.status || 'error';

if(process.env.NODE_ENV === 'development'){ 
   devErrors(res, error)
} else if(process.env.NODE_ENV === 'production'){
   if(error.name === 'ValidationError'){
       ValidationErrorHandler(res, error);
   }
   prodErrors(res, error);
   }
}