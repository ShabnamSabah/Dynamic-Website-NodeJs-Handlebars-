const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const SubNavItem1_6 = db.define('subnavitem1_6', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    
    details: {
        type: Sequelize.TEXT('long')

    },
    heading1:{
        type: Sequelize.STRING
    },
    h1_details: {
        type: Sequelize.TEXT('long')

    },
    heading2:{
        type: Sequelize.STRING
    },
    h2_details: {
        type: Sequelize.TEXT('long')

    },
    heading3:{
        type: Sequelize.STRING
    },
    h3_details: {
        type: Sequelize.TEXT('long')

    },
    heading4:{
        type: Sequelize.STRING
    },
    h4_details: {
        type: Sequelize.TEXT('long')

    },
    
    
   
},
    {
        timestamps: false
    });

module.exports = SubNavItem1_6;
