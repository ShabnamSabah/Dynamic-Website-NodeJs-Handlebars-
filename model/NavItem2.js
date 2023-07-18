const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const NavItem2 = db.define('navitem2_d', {
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

module.exports = NavItem2;
