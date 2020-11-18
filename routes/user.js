const app = require('express')();
const DB = require('../config/db');

const UserValidate = require('../middleware/UserValidate');

//Create User
app.post('/create', (req, res) => {

    let { error } = UserValidate(req.body);
    if (error) {
        res.send({ "success": false, "message": error.details[0].message })
    }

    DB.query("SELECT * FROM user WHERE email = ?", req.body.email, (err, results) => {
        if (results[0]) {
            res.send({ "success": false, "message": "User already exists" })
        } else {
            DB.query("INSERT INTO user SET ?", req.body, (err, results) => {
                if (!err) {
                    res.send({ "success": true, "message": "User created" })
                } else {
                    res.send({ "success": false, "message": err.code })
                }
            })
        }
    })

})

//Delete User
app.delete('/delete/:id', (req, res) => {

    DB.query("DELETE FROM user WHERE id = ?", req.params.id, (err, results) => {
        if (!err) {
            res.send({ "success": true, "message": "User deleted" })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

//List All Users
app.get('/', (req, res) => {

    DB.query('SELECT * FROM user', (err, results) => {
        if (!err) {
            res.send({ "success": true, "data": results })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

module.exports = app;