const express = require("express");
const controller = require("../controller/apihandler");
const router = express.Router();

router.route("/trades")
    .get(async (req, res, next) => {
        try {
            await controller.getAllTrades(req, res, next);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            await controller.createTrade(req, res, next);
        } catch (err) {
            next(err);
        }
    });

router.route("/trades/:id")
    .get(async (req, res, next) => {
        try {
            await controller.getTradeById(req, res, next);
        } catch (err) {
            next(err);
        }
    })
    .delete(controller.methodNotAllowed)
    .patch(controller.methodNotAllowed);

module.exports = router;
