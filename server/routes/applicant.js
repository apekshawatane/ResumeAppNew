const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const multer = require('multer');

const Applicant = require('../models/Applicant');
const helpers = require('../helpers');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        //   cb(null, `${file.fieldname}_${+new Date()}.jpg`);
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: helpers.fileFilter
});


//Add applicants
router.post('/addApplicant', upload.single("file"), (req, res, next) => {
    try{
        const userForm = req.body;
        console.log(userForm);
       Applicant.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            position: req.body.position,
            file: req.file.path
        })
        .then(app => {
            console.log(app.firstName);
        })
            .then(applicant => {
                res.json(applicant);
            })
            .catch(err => console.log(err))
        } catch(error) {
        res.status(400).send({ error: ex });
        }
});


//Get Applicants
router.get('/viewApplicant', async (req, res, next) =>
    await Applicant.findAll()
        .then(applicant => {
            res.json(applicant);
            // console.log(applicant);
            // res.sendStatus(200);
        })
        .catch(err => console.log(err))
);

//Get applicants by id
router.get('/viewApplicant/:id', (req, res, next) => {
 Applicant.findAll({ 
        where: {
             id: req.params.id 
            },
            attributes: ['file'],
         })
         .then(list => res.status(200).json(list))
        .then(applicant => {
            // res.download(path.join(__dirname, 'resume.pdf'), (err) => console.log(err))
            const rawData = res.json(applicant);
            console.log(rawData);
            const parsed = JSON.parse(rawData);
            console.log(parsed[0].file);
        })
        .catch(err => console.log(err))
});


//search
router.get('/search', (req,res) => {
    const {search} = req.query;
    Applicant.findAll({
        where: {
            firstName: {[Op.like]: '%' + search + '%'}
        }
    }).then(applicant => res.render('applicant', {applicant}))
    .catch(err => console.log(err));
});



//Delete an applicant
router.delete('/deleteApplicant/:id', async (req, res, next) => {
    await Applicant.findByPk(req.params.id)
        .then(applicant => {
            applicant.destroy();
            res.send('done');
        })
        .catch(err => console.log(err))
});




module.exports = router;