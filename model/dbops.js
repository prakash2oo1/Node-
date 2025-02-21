const mysql = require("mysql2");

const dbname = "trading_db";
const dbhost = "localhost";
const dbuser = "root";
const dbpassword = "123456";
const dbport = 3306;

// Create a connection without specifying the database initially
const conn = mysql.createConnection({
    host: dbhost,
    user: dbuser,
    password: dbpassword,
    port: dbport,
    //database: dbname
});

function createDatabase() {
    const dbquery = `CREATE DATABASE IF NOT EXISTS ${dbname}`;
    conn.query(dbquery, (err, result) => {
        if (err) {
            console.log("Error in creating database:", err);
        } else {
            console.log("Database created or already exists");

            conn.changeUser({ database: dbname }, (err) => {
                if (err) {
                    console.log("Error switching to database:", err);
                } else {
                    console.log("Connected to database:", dbname);
                    createTradeTable();
                }
            });
        }
    });
}

function createTradeTable() {
    const tableQuery = `
        CREATE TABLE IF NOT EXISTS trades (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('buy', 'sell') NOT NULL,
            user_id INT NOT NULL,
            symbol VARCHAR(10) NOT NULL,
            shares INT NOT NULL,
            price INT NOT NULL,
            timestamp BIGINT NOT NULL
        )
    `;
    conn.query(tableQuery, (err, result) => {
        if (err) {
            console.log("Error in creating trades table:", err);
        } else {
            console.log("Trades table created or already exists");
        }
    });
}

function addTrade(trade) {
    const insertQuery = `
        INSERT INTO trades (type, user_id, symbol, shares, price, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conn.query(insertQuery, [trade.type, trade.user_id, trade.symbol, trade.shares, trade.price, trade.timestamp || Date.now()], (err, result) => {
        if (err) {
            console.log("Error inserting trade:", err);
        } else {
            console.log("Trade added", result.affectedRows);
        }
    });
}

module.exports = {
    conn,
    createDatabase,
    createTradeTable,
    addTrade
};