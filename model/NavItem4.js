const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const NavItem4 = db.define('navitem4_d', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    details: {
        type: Sequelize.TEXT('long')

    },
    date1:{
        type: Sequelize.STRING
    },
    
   date1_details: {
    type: Sequelize.TEXT('long')

    },
    
    date2:{
        type: Sequelize.STRING
    },
    
   date2_details: {
    type: Sequelize.TEXT('long')

    },
    date3:{
        type: Sequelize.STRING
    },
    
   date3_details: {
    type: Sequelize.TEXT('long')

    },
    date4:{
        type: Sequelize.STRING
    },
    
   date4_details: {
       type: Sequelize.TEXT('long')

    },
    date5:{
        type: Sequelize.STRING
    },
    
   date5_details: {
    type: Sequelize.TEXT('long')

    },
    date6:{
        type: Sequelize.STRING
    },
    
   date6_details: {
    type: Sequelize.TEXT('long')

    }
    
    
   
},
    {
        timestamps: false
    });

 
module.exports = NavItem4;
