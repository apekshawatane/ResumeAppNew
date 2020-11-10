const Sequelize = require('sequelize');
const db = require('../config/database');


const Position = db.define('Positions', {
    position: {
        type: Sequelize.STRING
    }
});

module.exports = Position;