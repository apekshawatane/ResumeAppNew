const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');


const Manager = db.define('managers', {
    userName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
 
});

//generating a hash
Manager.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//checking if password is valid
Manager.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}


module.exports = Manager;