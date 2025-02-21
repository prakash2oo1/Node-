const dbops = require("../model/dbops");

exports.getAllTrades = (req, res) => { 
    const { type, user_id } = req.query;
    let query = "SELECT * FROM trades";
    const values = [];

    if (type || user_id) {
        const conditions = [];
        if (type) {
            conditions.push('type = ?');
            values.push(type);
        }
        if (user_id) {
            conditions.push('user_id = ?');
            values.push(user_id);
        }
        query += ' WHERE ' + conditions.join(' AND ');
    }

    dbops.conn.query(query, values, (err, results) => {
        if (err) {
            return next({
                statusCode: 500,
                message: "Error fetching trades",
            });
        }
        res.status(200).json({
            status: "success",
            data: results,
        });
    });
};

exports.createTrade = (req, res) => { 
    const { type, user_id, symbol, shares, price } = req.body;

    // Validate trade type
    if (type !== 'buy' && type !== 'sell') {
        return next({
            statusCode: 400,
            message: "Incorrect type provided"
        });
    }

    // Validate shares range
    if (shares < 1 || shares > 100) {
        return next({
            statusCode: 400,
            message: "Shares value out of range"
        });
    }

    const newTrade = { type, user_id, symbol, shares, price, timestamp: Date.now() };

    dbops.addTrade(newTrade)
        .then(trade => {
            res.status(201).json({
                status: "success",
                data: trade
            });
        })
        .catch(err => {
            next({
                statusCode: 400,
                message: "Error creating trade"
            });
        });
};

exports.getTradeById = (req, res) => { 
    const tradeId = req.params.id;
    
    dbops.conn.query('SELECT * FROM trades WHERE id = ?', [tradeId], (err, results) => {
        if (err) {
            return next({
                statusCode: 500,
                message: "Error fetching trade"
            });
        }
        if (results.length === 0) {
            return next({
                statusCode: 404,
                message: "ID not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: results[0]
        });
    });
};

exports.methodNotAllowed = (req, res) => {
    res.status(405).json({
        statusCode: 405,
        message: "Method not allowed"
    });
};