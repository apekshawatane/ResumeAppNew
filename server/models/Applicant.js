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
        type: Sequelize.STRING,
        // get: function() {
        //     return JSON.parse(this.getDataValue('position'));
        // }, 
        // set: function(val) {
        //     return this.setDataValue('position', JSON.stringify(val));
    },
    file: {
        type: Sequelize.STRING,
    }

}
,
{
    paranoid: true, 
    timestamps: true
    }
);

module.exports = Applicant;