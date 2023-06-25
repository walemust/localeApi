const mongoose = require('mongoose');
const CONFIG = require("./env.config")

// module.exports = connectDB;
const connectDB = async()=>{
try {
    const conn = await  mongoose.connect(CONFIG.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
     console.log(`MongoDB connected: ${conn.connection.host}`)

} catch (error) {
    console.error(error);
    process.exit(1)
}
  
}

module.exports = connectDB;