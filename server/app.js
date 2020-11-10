const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');


//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));


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
// app.use('/applicantPost', require('./routes/applicantPost'));
app.use('/applicant', require('./routes/applicant'));
app.use("/testAPI", require('./routes/testAPI'));
app.use("/manager", require('./routes/manager'));
app.use("/position", require('./routes/position'));


//PORT 
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server has started"));

