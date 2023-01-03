const Sequelize = require('sequelize');
const connect = require('../Database/database');
    
const User = connect.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false});

module.exports = User;