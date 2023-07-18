const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const Subscriber = db.define('subscriber',{

email:{
    type: Sequelize.STRING
    
}},
{
    timestamps:false
});    


module.exports= Subscriber;
