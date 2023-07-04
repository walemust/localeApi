const swaggerUi = require('swagger-ui-express');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs').promises;
const path = require('path');

const app = express();
const authRouter = require("./routes/auth.route");
const router = require("./routes/nigeriaData.route");

async function startApp() {
    try {
        const swaggerFilePath = path.resolve(__dirname, './swagger-output.json');
        const swaggerData = await fs.readFile(swaggerFilePath, 'utf8');
        const newSwag = JSON.parse(swaggerData);
        //const newSwag = JSON.parse(await readfile(new URL('./swagger-output.json', import.meta.url)))

        app.use(require("./utils/middlewares/rateLimiter"));
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))

        //middleware to grab post/patch requests as json files or other files
        app.use(express.json());


        app.get("/", (req, res) => {
            res.send({
                success: true,
                message: " Welcome to NIGERIA Locale service"
            })
        });
        //app middleware to the user registration & login routes
        app.use("/api/v1/auth", authRouter);
        //route path middleware
        app.use("/api/v1/search", router);
        //404 handler
        app.all("*", require("./utils/error/404.error"))
        //global error handler
        app.use(require("./utils/error/globalError"))
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(newSwag, { explorer: true }));
    }
    catch (error) {
        console.error('Error reading Swagger file:', error);
    }
}

startApp();

module.exports = app;