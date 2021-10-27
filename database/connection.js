const Sequelize = require('sequelize');
const connection = new Sequelize('edukarlogin', 'root', 'batsf3rr',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = connection