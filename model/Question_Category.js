const Sequelize = require('sequelize');
const db = require('../config/database');
//const QuestionAnswer = require('../model/QuestionAnswer');

//creating model

const Question_Category = db.define('question_category', {
  qtype: {
        type: Sequelize.STRING

    }
    
   
},
    {
        timestamps: false
    });


module.exports = Question_Category;
