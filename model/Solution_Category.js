const Sequelize = require('sequelize');
const db = require('../config/database');
//const Solution_Details = require('../model/Solution_Details');

//creating model

const Solution_Category = db.define('solution_category', {
   stype: {
        type: Sequelize.STRING

    },
   
    overview:{
        type: Sequelize.TEXT('long')

    },
    description:{
        type: Sequelize.TEXT('long')

    },
    use_case:{
        type: Sequelize.TEXT('long')

    },
    
    picture:{
        type: Sequelize.STRING
    }
   
},
    {
        timestamps: false
    });

    
   
 
module.exports = Solution_Category;
