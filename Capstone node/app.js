const express = require("express");
const tradeRouter = require("./routes/routes"); 
const errorHandler = require("./controller/errorhandler");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/api/v1/", tradeRouter);

app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    err.status = "fail";
    next(err); 
});

// Use error middleware
app.use(errorHandler.errorMiddleware);

module.exports = app;