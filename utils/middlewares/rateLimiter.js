const rateLimit = require("express-rate-limit");

// Middleware for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests, please try again in (15)minutes.',
  });
  
  module.exports = limiter;