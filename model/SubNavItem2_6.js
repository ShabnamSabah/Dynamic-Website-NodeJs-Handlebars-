const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const SubNavItem2_6 = db.define('subnavitem2_6', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    
    details: {
        type: Sequelize.TEXT('long')

    },
       
    
   
},
    {
        timestamps: false
    });

module.exports = SubNavItem2_6;
