const Sequelize = require('sequelize');
const db = require('../config/database');
//const Solution_Category = require('../model/Solution_Category');

//creating model

const Solution_Details = db.define('solution_details', {

    title: {
        type: Sequelize.STRING

    },
    
    overview1: {
        type: Sequelize.TEXT('long')

    },
    
    description1: {
        type: Sequelize.TEXT('long')

    },
    picture1: {
        type: Sequelize.STRING

    }
   
},
    {
        timestamps: false
    });
    
  

  
module.exports = Solution_Details;


