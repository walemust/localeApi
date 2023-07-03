const swaggerAutogen = require("swagger-autogen");
const dotenv = require("dotenv");

dotenv.config()

console.log(process.env.host_url)

const doc = {
    info: {
        title: 'Nigerian Locale API',
        description: 'Description',
    },
    host: process.env.host_url,
    schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['app.js', './routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
