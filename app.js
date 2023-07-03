const swaggerUi = require('swagger-ui-express');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./routes/auth.route");
const router = require("./routes/nigeriaData.route");

const newSwag = JSON.parse(readfile(new URL('./swagger-output.json', import.meta.url)))


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

module.exports = app