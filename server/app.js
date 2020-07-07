const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require("cors");


//middleware
app.use(bodyParser.json());
app.use(cors());


//database
const db = require('./config/database');

//test db
db.authenticate()
    .then(() => console.log('database connected..'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send("hello");
});

//ROUTES
app.use('/applicant', require('./routes/applicant'));
app.use("/testAPI", require('./routes/testAPI'));


//PORT 
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server has started"));

