# A very simple node RESTful api

Uses db.json and filesystem as mockup for database;

To test use nodemon index, or node index and then use "localhost:8080" address for requests.

## Availabale requests

"api/" +

GET **user** - returns an array of users;

GET **user/:id** - returns specific user if exists;

POST **user** - creates user with "name" and "login" set in the request body;

PUT **user/:id** - modifies _existing_ user field ("name" or "login") set through request body;
