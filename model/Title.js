const Sequelize = require('sequelize');
const db = require('../config/database');

//creating model

const Title = db.define('title', {
    title: {
       type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
     
},
    {
        timestamps: false
    });
  

module.exports = Title;
