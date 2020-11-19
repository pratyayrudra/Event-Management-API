const mysql = require('mysql');

var mysqlConnection = mysql.createConnection(process.env.DATABASE_URL);

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to database");
    } else {
        console.log('Connection failed');
    }
})

//To keep the mysql connection alive
setInterval(function () {
    mysqlConnection.query('SELECT 1');
}, 5000);

module.exports = mysqlConnection;