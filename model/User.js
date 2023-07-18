const Sequelize = require('sequelize');
const db= require('../config/database');
// const Title = require('../model/Title');
// const NavItems = require('../model/NavItems');
// const NavItem1 = require('../model/NavItem1');
// const NavItem2 = require('../model/NavItem2');
// const NavItem3 = require('../model/NavItem3');
// const NavItem4 = require('../model/NavItem4');
// const SubNavItem1_6 = require('../model/SubNavItem1_6');
// const SubNavItem2_6 = require('../model/SubNavItem2_6');
// const SubNavItem4_6 = require('../model/SubNavItem4_6');

//creating model

const User = db.define('users',{
name:{
type: Sequelize.STRING

},
email:{
    type: Sequelize.STRING
    
},
password:{
   type: Sequelize.STRING
        
}},
{
    timestamps:false
});    



module.exports= User;
