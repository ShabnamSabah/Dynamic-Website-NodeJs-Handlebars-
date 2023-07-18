const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');
//creating model

const Advisor = db.define('advisor', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    details: {
        type: Sequelize.TEXT('long')

    }


},
{
    timestamps: false
});



module.exports= Advisor;