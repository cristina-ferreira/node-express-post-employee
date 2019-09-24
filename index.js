const express = require('express');
const app = express();
const port = 3000;
const connection = require('./db');

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// listen to the url "/api/employees" with the verb POST
app.post('/api/employees', (req, res) => {

  // Get the data sent
    const formData = req.body;

  // connection to the database, and insertion of the employee
    connection.query('INSERT INTO employee SET ?', formData, (err, results) => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send("Error saving an employee");
      } else {
        // If everything went well, we send a status "ok".
        res.sendStatus(200);
      }
    });
});

app.listen(port, (err) => {
 if (err) {
   throw new Error('Something bad happened...');
 }

 console.log(`Server is listening on ${port}`);
});