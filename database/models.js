const Sequelize = require("sequelize");
const connection = require("./connection");

const userData = connection.define("Students", {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    birthday:{
      type: Sequelize.DATE,
      allowNull: false  
    },
    
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    media: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});


module.exports = userData