const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../model/User');
//creating model

const AdvisorTeam = db.define('advisor_team', {
   amember_name: {
        type: Sequelize.STRING

    },
    role: {
        type: Sequelize.STRING

    },
    picture: {
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

   module.exports= AdvisorTeam;