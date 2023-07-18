const Sequelize = require('sequelize');
const db = require('../config/database');

//creating model

const CreativeTeam = db.define('creative_team', {
   cmember_name: {
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


   module.exports= CreativeTeam;