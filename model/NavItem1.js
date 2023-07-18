const Sequelize = require('sequelize');
const db = require('../config/database');
const User= require('../model/User');
//creating model

const NavItem1 = db.define('navitem1_d', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    details: {
        type: Sequelize.TEXT('long')

    },
    heading:{
        type: Sequelize.STRING
    },
    
   description: {
    type: Sequelize.TEXT('long')

    },
    picture:{
        type: Sequelize.STRING
    }
   
},
    {
        timestamps: false
    });
    


module.exports = NavItem1;
