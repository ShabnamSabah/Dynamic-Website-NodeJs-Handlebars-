const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');

//creating model

const SubNavItem4_6 = db.define('subnavitem4_6', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    },
    details: {
        type: Sequelize.STRING(1000)

    },
    phone:{
        type: Sequelize.STRING
    },
    
    email: {
        type: Sequelize.STRING

    },
    telegram_link: {
        type: Sequelize.STRING

    },
    linkedin_link: {
        type: Sequelize.STRING

    },
    fb_link:{
        type: Sequelize.STRING

    },
    github_link:{
        type: Sequelize.STRING
    }
   
},
    {
        timestamps: false
    });
    
module.exports = SubNavItem4_6;
