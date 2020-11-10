const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Position = require('../models/Position');

//Get Positions
router.get('/', async (req, res) =>
    Position.findAll()
        .then(position => {
            res.json(position);
            // console.log(applicant);
            
        })
        .catch(err => console.log(err))
);

// Add positions in the database
// router.post('/', (req, res) => {
//     Position.create({
//         position: req.body.position
//     })
//         .then(position => {
//             res.json(position);
//         })
//         .catch(err => console.log(err))
// });


module.exports = router;