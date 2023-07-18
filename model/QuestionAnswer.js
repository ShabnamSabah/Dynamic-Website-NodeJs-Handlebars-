const Sequelize = require('sequelize');
const db = require('../config/database');
const Question_Category = require('../model/Question_Category');
//creating model

const QuestionAnswer = db.define('question_answer', {
  question: {
    type: Sequelize.TEXT('long')

    },
    answer:{


        type: Sequelize.TEXT('long')
    }
    
   
},
    {
        timestamps: false
    });

   
   
module.exports = QuestionAnswer;
