const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const Feedback = db.define('feedback',{
name:{
type: Sequelize.STRING

},
email:{
    type: Sequelize.STRING
    
},
message:{
    type: Sequelize.TEXT('long')
        
}},
{
    timestamps:false
});    

module.exports= Feedback;
