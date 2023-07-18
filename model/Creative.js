const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');


//creating model

const Creative = db.define('creative', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    details: {
        type: Sequelize.TEXT('long')

    },
   
    subheading1:{
        type: Sequelize.STRING
    },
   
    subheading2:{
        type: Sequelize.STRING
    },
   
    subheading3:{
        type: Sequelize.STRING
    }


},
{
    timestamps: false
});



   module.exports= Creative;