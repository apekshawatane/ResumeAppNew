const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const Manager = require('../models/Manager');
const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;


// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.SECRET_OR_KEY
// };

// const strategy = new JwtStrategy(opts, (payload, next) => {
//     //get manager from db
//     const manager = null;
//     next(null, manager);
// }) 
// passport.use(strategy);
// router.use(passport.initialize());

//register
// router.post('/', (req,res) => {
//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//         Manager.create({
//             userName: req.body.userName,
//             password: hash
//         }).then((data) => {
//             res.send('manager created');
//         });
//     });
// });


//Protect this route
router.post('/protect', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_OR_KEY , (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created',
                authData
            });

        }
    });
});

//Login
router.post('/login', async(req, res) => {
    try {
        await Manager.findOne({
            where: {
                userName: req.body.userName,
                // password: req.body.password
            }
        }).then((manager) => {
            if (!manager) {
                // return res.send('manager not found');
                return res.status(404).json({ error: "No Profile Found" });
            } else {
                bcrypt.compare(req.body.password, manager.password, (err, result) => {
                    if (result === true) {
                        // res.send("manager matched");
                        jwt.sign({ userName: manager.userName, password: manager.password }, 
                            process.env.SECRET_OR_KEY , 
                        {expiresIn: 3600}, 
                            (err, token) => {
                            return res.json({
                                token: token
                            });
                        });
                    }
                    else {
                        return res.send("Incorrect password");
                    }

                });
            }
        });
    } catch (err) {
res.send("error found");
    }
});

//Verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at space
        const bearer = bearerHeader.split(" ");
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //Forbidden
        return res.sendStatus(403);
    }
}

module.exports = router;