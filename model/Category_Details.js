const Sequelize = require('sequelize');
const db = require('../config/database');


//creating model

const Category_Details = db.define('category_details', {
   title: {
        type: Sequelize.STRING

    },
 
   abstract: {
      type: Sequelize.TEXT('long')

    },

    website_link: {
        type: Sequelize.STRING

    },
    picture1:
        {
            type: Sequelize.STRING
    
        },

    
},
    {
        timestamps: false
    });



module.exports = Category_Details;


