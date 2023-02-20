const express = require("express");
const globalErroeController = require('./controllers/errorController')
const router = require('./routers');
const AppError = require("./utils/appError");

const app = express();
app.enable('trust proxy');

app.use(express.json());

// Root
app.get("/", (_req, res) => {
    return res.send({ status: 'success', message: "Welcome Test service!" });
});

// Your Routers go here
app.use(`/api/v1`, router);


/*
* After all routers
* Creatin Error whene requested url not found
*/
app.all('*', (req, res, next) => {
    return next(new AppError('Rout not found', 404))
});

// Error Handler
// Handling all error and exceptions
app.use(globalErroeController);

/**
 * Server configuration
 */
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'production'
app.listen(port, () => {
    console.log(`App is running in ${env.toUpperCase()} environment`);
    console.log(`App is running on port ${port} .....`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err);

    app.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', err => {
    console.log(err.name, err);
    app.close(() => {
        process.exit(1);
    });
});
