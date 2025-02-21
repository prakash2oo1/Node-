const app = require("./app");
const dbops = require("./model/dbops");

const port = 8000;

dbops.conn.connect((err) => {
    if (err) {
        console.log("Error in connection:", err);
    } else {
        console.log("Connected to database");
        dbops.createDatabase();
        dbops.createTradeTable();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
