
// Setup empty JS object to act as endpoint for all routes
let projectData;

// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// Start up an instance of app
const app = express();

//Configuring the server's dependencies.
app.use(express.static('website'));
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Setup Server
const port = process.env.port || 3000;
app.listen(port, () => {console.log(`Server Running on localhost:${port}`)})


/* ROUTES */
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/all', (req, res) => {
    res.send(projectData);
    projectData = {};
})

app.post('/add', (req, res) => {
    console.log(req.body);
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
    }
    projectData = newEntry;
})