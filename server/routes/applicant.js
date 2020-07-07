const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Applicant = require('../models/Applicant');

//Get Applicants
router.get('/', (req, res) =>
    Applicant.findAll()
        .then(applicant => {
            res.json(applicant);
            // console.log(applicant);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
);

//Get applicants by id
router.get('/:id', (req, res) => {
    Applicant.findAll({ where: { id: req.params.id } })
        .then(applicant => res.json(applicant))
        .catch(err => console.log(err))
});

//Add applicants
router.post('/', (req, res) => {
    Applicant.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        position: req.body.position
    })
        .then(applicant => {
            res.json(applicant);
        })
        .catch(err => console.log(err))
});

//Delete an applicant
router.delete('/:id', (req, res) => {
    Applicant.findByPk(req.params.id)
        .then(applicant => {
            applicant.destroy();
        }).then((applicant) => {
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
});

// router.get('/add', (req, res) => {
//     const data = {
//         firstName: 'Travis',
//         lastName: 'Scott',
//         email: 'travis.scott@gmail.com',
//         position: 'web developer'
//     }

//     let {firstName, lastName, email, position} = data;

//     //Insert into table
//     Applicant.create({
//         firstName,
//         lastName,
//         email,
//         position
//     }

//     )
//     .then(applicant => res.redirect('/applicant'))
//     .catch(err => console.log(err));
// });

module.exports = router;