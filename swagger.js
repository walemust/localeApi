const swaggerAutogen = require("swagger-autogen");
require("dotenv").config();

console.log(process.env.HOST_URL);

const doc = {
    info: {
        title: 'Nigerian Locale API',
        description: 'Description',
    },
    host: process.env.HOST_URL,
    schemes: ['https', 'http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Bearer Token',
        },
    },
    security: [{ BearerAuth: [] }],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js', './routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

