const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const NavItems = db.define('navitems', {
    navitem1: {
        type: Sequelize.STRING

    },
    navitem2: {
        type: Sequelize.STRING

    },
    navitem3: {
        type: Sequelize.STRING

    },
    navitem3: {
        type: Sequelize.STRING

    },
    navitem4: {
        type: Sequelize.STRING

    },
    navitem5: {
        type: Sequelize.STRING

    },
    navitem6: {
        type: Sequelize.STRING

    },
    snavitem1_6: {
        type: Sequelize.STRING

    },
    snavitem2_6: {
        type: Sequelize.STRING

    },
    
    snavitem3_6: {
        type: Sequelize.STRING

    }
   
},
    {
        timestamps: false
    });


module.exports = NavItems;
