const express = require("express");
const controller = require("../controller/apihandler");
const router = express.Router();

router.route("/trades")
    .get((req, res, next) => {
        controller.getAllTrades(req, res, next);
    })
    .post((req, res, next) => {
        controller.createTrade(req, res, next);
    });

router.route("/trades/:id")
    .get((req, res, next) => {
        controller.getTradeById(req, res, next);
    })
    .delete(controller.methodNotAllowed)
    .patch(controller.methodNotAllowed);

module.exports = router;