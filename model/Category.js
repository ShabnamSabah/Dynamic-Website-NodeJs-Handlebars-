const Sequelize = require('sequelize');
const db = require('../config/database');

//creating model

const Category = db.define('category', {
   wtype: {
        type: Sequelize.STRING

    },
    
    overview: {
        
      type: Sequelize.TEXT('long')


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

    
   
 
module.exports = Category;
