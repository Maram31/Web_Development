// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app =express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
}

//GET route
app.get('/all', function sendData(request, response) {

  response.send(projectData);  
  
  //console.log('get');
	console.log(projectData);
});

// POST route
app.post('/add', function postData(request, response) {
    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        feelings: request.body.feelings,
      };
    

    projectData.push(newEntry);
    
    //console.log('post');
    console.log(projectData);
    
});
