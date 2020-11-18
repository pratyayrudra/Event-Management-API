# Event Management API
> This is for demo purpose only.
 
## Introduction
This is an event management API with NodeJS, ExpressJS and MySQL.

## Features
Things I have implemented in this API:
- All Users can be listed. User can be created and deleted. (Only Name and Email)
- Events can be created, deleted, all events can be listed and upcoming events can be listed.
- A registered user only can attend an event.
- All the attendees of a particular event can be listed
- All the attendees of all events can be listed
- While the user registers for an event following scenarios has been handled:
	- User is validated using the *userID* and *email*
	- The event is valid or not is checked using the *eventID*
	- If the event is valid then it is checked whether the event is upcoming or not
	- If both user and event is valid then it is checked if that user tried to register for that event before. Then according to the last status i.e., registered or in waiting list is shown
	- If the user is trying to register for first time for the event then:
		- If the event is full then the user is put on the waiting list
		- If the event is not full then the user registers successfully

## Getting Started
The API is published on heroku. It can be accessed [Here](https://pratyay-event-management-api.herokuapp.com/)
Use [Postman](https://www.postman.com/) or [Insomnia](https://www.postman.com/) to test the APIs


## Database
> Basic data validation is there before database entry
### Tables:

#### event:- 
- **id*** ( Primary Key, Integer. Auto generated)
- **title*** (String, Limit 100)
- **description*** (String, Limit 5000)
-  **image** (URL)
- **date*** (ISO Datetime String)
- **location*** (String)
- **allowed_attendees*** (Integer)
- **waitlist** (Integer, Default 0)
- **startTime** (ISO Timestamp)
- **endTime** (ISO Timestamp)

#### user:- 
- **id*** ( Primary Key, Integer. Auto generated)
- **name*** (String, Limit 50)
- **email*** (Email)

#### attendees:- 
- **id*** ( Primary Key, Integer. Auto generated)
- **userID*** (Integer)
- **eventID*** (Integer)
- **status*** (Boolean)
	
## Usage

### *USERS API:*

### GET  ```/user```
- Returns list of all users
```
GET /user/ HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```
### POST ```/user/create```
- Creates a new user
- JSON Body for request
- Parameters required in request body:
	- **name*** (String)
	- **email*** (Email)
```
POST /user/create HTTP/1.1
Content-Type: application/json
Host: pratyay-event-management-api.herokuapp.com
Content-Length: 48

{
	"name":"Test 1",
	"email": "test1@abcd.com"
}
```

### DELETE ```/user/delete/:id```
- Deletes a user
- User ID is needed as a parameter in the URL
- Parameters required in request URL:
	- **id*** (Integer)
```
DELETE /user/delete/1 HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```

### *EVENTS API:*

### GET ```/event```
- Gets all events
```
GET /event/ HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```

### GET ```/event/upcoming```
- Gets all upcoming events from current time
```
GET /event/upcoming HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```
### POST ```/event/create```
- Creates a new event
- JSON Body for request
- Parameters required in request body:
	- **id*** ( Primary Key, Integer. Auto generated)
	- **title*** (String, Limit 100)
	- **description*** (String, Limit 5000)
	-  **image** (URL)
	- **date*** (ISO Datetime String)
	- **location*** (String)
	- **allowed_attendees*** (Integer)
	- **waitlist** (Integer, Default 0)
	- **startTime** (ISO Timestamp)
	- **endTime** (ISO Timestamp)
```
POST /event/create HTTP/1.1
Content-Type: application/json
Host: pratyay-event-management-api.herokuapp.com
Content-Length: 294

{
	"title": "This is a test",
	"description": "This is test de1scription",
	"image": "https://picsum.photos",
	"date": "2020-11-16T00:00:08.476Z",
	"location": "Kolkata",
	"allowed_attendees": 1,
	"waitlist": 0,
	"startTime": "2020-11-16T22:00:08.476Z",
	"endTime": "2020-11-16T23:00:08.476Z"
}
```
### DELETE ```/event/delete/:id```
- Deletes an event
- Event ID is needed as a parameter in the URL
- Parameters required in request URL:
	- **id*** (Integer)
```
DELETE /event/delete/1 HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```
### *ATTEND API:*

### GET ```/attend/all```
- Gets all attendees
```
GET /attend/ HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```

### GET ```/attend/event/:id```
- Gets all attendees of an particular event
- Event ID is needed as a parameter in the URL
- Parameters required in request URL:
	- **id*** (Integer)
```
GET /attend/event/1 HTTP/1.1
Host: pratyay-event-management-api.herokuapp.com
```

### POST ```/attend```
- Creates a new user registration for an event
- JSON Body for request
- Parameters required in request body:
	- **userID*** (Integer)
	- **eventID*** (Integer)
	- **email*** (Email)
```
POST /attend/ HTTP/1.1
Content-Type: application/json
Host: pratyay-event-management-api.herokuapp.com
Content-Length: 59

{
	"userID": 1,
	"eventID": 1,
	"email": "test1@abcd.com"
}
```