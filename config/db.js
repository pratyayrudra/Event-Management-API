const mysql = require('mysql');

var mysqlConnection = mysql.createConnection(process.env.DATABASE_URL);

handleConnection = () => {
    mysqlConnection.connect((err) => {
        if (!err) {
            console.log("Connected to database");
        } else {
            console.log('Connection failed');
        }
    })
}

handleConnection();

mysqlConnection.on('error', () => {
    handleConnection();
})

module.exports = mysqlConnection;