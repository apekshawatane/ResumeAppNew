const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const Applicant = require('../models/Applicant');


router.post('/applicantPost', upload.single('file'), (req, res) => {
    Applicant.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        position: req.body.position,
        file: req.body.file
    })
        .then(applicant => {
            res.json(applicant);
        })
        .catch(err => console.log(err))
});

module.exports = router;