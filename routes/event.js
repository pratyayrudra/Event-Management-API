const app = require('express')();
const DB = require('../config/db');

const EventValidate = require('../middleware/EventValidate');

//Create Event
app.post('/create', (req, res) => {

    let { error } = EventValidate(req.body);
    if (error) {
        res.send({ "success": false, "message": error.details[0].message })
    }

    DB.query("INSERT INTO event SET ?", req.body, (err, results) => {
        if (!err) {
            res.send({ "success": true, "message": "Event created" })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

//Delete Event
app.delete('/delete/:id', (req, res) => {

    DB.query("DELETE FROM event WHERE id=?", req.params.id, (err, results) => {
        if (!err) {
            res.send({ "success": true, "message": "Event Deleted" })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

//List Upcoming Events
app.get('/upcoming', (req, res) => {

    DB.query("SELECT * FROM event WHERE date >= Now()", (err, results) => {
        if (!err) {
            res.send({ "success": true, "data": results })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

//List All Events
app.get('/', (req, res) => {

    DB.query("SELECT * FROM event", (err, results) => {
        if (!err) {
            res.send({ "success": true, "data": results })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })

})

module.exports = app;