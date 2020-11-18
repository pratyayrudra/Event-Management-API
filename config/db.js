const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'event-management-api'
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to database");
    } else {
        console.log('Connection failed');
    }
})

module.exports = mysqlConnection;