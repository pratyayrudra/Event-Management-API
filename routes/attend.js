const app = require('express')();
const DB = require('../config/db');

const AttendValidate = require('../middleware/AttendValidate');

//Attend Event
app.post('/', (req, res) => {

    //Validation of attend request
    let { error } = AttendValidate(req.body);
    if (error) {
        return res.send({ "success": false, "message": error.details[0].message })
    }

    /*
    Checking if the user is valid or not by matching the userID and email
    If the user is registered then rest of the checking is done
    */
    DB.query(`SELECT * FROM user WHERE id = ${req.body.userID} and email = "${req.body.email}"`, (err, users) => {
        if (!users[0]) {
            res.send({ "success": false, "message": "Invalid User" })
        } else {

            /*
            Checking if the eventID is valid or not
            If valid then checking if the event is upcoming or not
            */
            DB.query(`SELECT allowed_attendees,date FROM event WHERE id = ${req.body.eventID}`, (err, events) => {

                if (!events[0]) {
                    //Checking if the event is valid or not
                    res.send({ "success": false, "message": "Invalid Event" })
                } else if (events[0].date < Date.now()) {
                    //Checking if the event is an upcoming event or not
                    res.send({ "success": false, "message": "Trying to register for a past event" })
                } else {

                    //Checking if the user already registered for the event before or not
                    DB.query(`SELECT status from attendees WHERE eventID = ${req.body.eventID} and userID = ${req.body.userID}`, (err, result) => {

                        //Checking the current status of registration and no new registration is tried
                        if (result[0]) {
                            if (result[0].status == false) {
                                res.send({ "success": false, "message": "You are already in waiting list." })
                            } else if (result[0].status == true) {
                                res.send({ "success": false, "message": "You are already registered for the event." })
                            }
                        } else {
                            //Checking if attendees list is full or not
                            DB.query(`SELECT count(*) AS Attendees FROM attendees WHERE eventID = ${req.body.eventID} and status = True`, (err, results) => {
                                let invite = {
                                    "userID": req.body.userID,
                                    "eventID": req.body.eventID
                                }

                                //If list is not full then new registration is successful 
                                if (results[0].Attendees < events[0].allowed_attendees) {
                                    DB.query("INSERT INTO attendees SET ?", { ...invite, "status": true, }, (err, results) => {
                                        res.send({ "success": true, "message": "Your registration for the event is successful" })
                                    })
                                } else {
                                    //If list is full then the request is added to waiting list
                                    DB.query("INSERT INTO attendees SET ?", { ...invite, "status": false }, (err, results) => {
                                        DB.query(`UPDATE event SET waitlist = waitlist+1 WHERE id = ${req.body.eventID}`, (err, results) => {
                                            res.send({ "success": false, "message": "The event is full. You are in waiting list." })
                                        })
                                    })
                                }
                            })
                        }

                    })
                }
            })
        }
    })

})

//Attendees of an Event
app.get("/event/:id", (req, res) => {
    DB.query(`SELECT * FROM attendees WHERE eventID = ${req.params.id}`, (err, results) => {
        if (!err) {
            res.send({ "success": true, "data": results })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })
})

//All Attendees of all Events
app.get('/all', (req, res) => {
    DB.query("SELECT * FROM attendees", (err, results) => {
        if (!err) {
            res.send({ "success": true, "data": results })
        } else {
            res.send({ "success": false, "message": err.code })
        }
    })
})

module.exports = app;