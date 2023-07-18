const express = require('express');
const User = require('../../model/User');
const db = require('../../config/database');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required } = require('yargs');
const { json } = require('body-parser');
const router = express.Router();

//router.get('/register', (req, res) => res.render('auth/register',{layout:false}));
router.get('/login', (req, res) => res.render('auth/login', {layout:false}));





router.post('/login', (req, res) => {


    if (!req.body.email || !req.body.password) {
      req.flash('error_msg', 'Please Give Email And Password');
      res.redirect('/auth/login');
    }
    else {
      User.findOne({ where: { email: req.body.email } })
        .then(user => {
          if (!user) {
            req.flash('error_msg', 'The Email Is Not registerd');
            res.redirect('/auth/login');
          } else {
  
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
  
                req.session.loggedin = true;
                req.session.name = user.name;
                req.session.email = user.email;
                req.session.userId = user.id;
                //res.redirect('/admin/dashboard');
                res.redirect('/');
  
              } else {
                req.flash('error_msg', 'Incorrect Password');
                res.redirect('/auth/login');
              }
  
            });
          }
  
        }).catch(err => console.log(err));
  
    }
  
  })



router.get('/logout', async (req, res) => {
    if (req.session.loggedin) {
      req.session.destroy(function () {
        console.log("user logged out.")
      });
      res.redirect('/');
    }
  });

  module.exports= router;
  