const mysql = require('mysql');

var mysqlConnection = mysql.createConnection(process.env.DATABASE_URL);

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to database");
    } else {
        console.log('Connection failed');
    }
})

module.exports = mysqlConnection;