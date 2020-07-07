const Sequelize = require('sequelize');
const db = require('../config/database');

const Applicant = db.define('applicants', {
    lastName: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    position: {
        type: Sequelize.STRING
    }
});

module.exports = Applicant;