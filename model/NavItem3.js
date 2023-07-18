const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');

//creating model

const NavItem3 = db.define('navitem3_d', {
   title: {
        type: Sequelize.STRING

    },
    subtitle: {
        type: Sequelize.STRING

    }
  


},
{
    timestamps: false
});

   module.exports= NavItem3;