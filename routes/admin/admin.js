const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');
const Feedback = require('../../model/Feedback');
const Subscriber = require('../../model/Subscriber');

router.get('/dashboard', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/dashboard', {
                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        title1,
                        navitems
    
                    });

                })

                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});


router.get('/view-feedback', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                     Feedback.findAll()
                     .then(feedback=>{

                            res.render('admin/feedback-list', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            email: req.session.email,
                            id: req.session.userid,
                            title1,
                            navitems,
                            feedback
        
                        });


                     })
                     .catch(err => console.log(err));

                })

                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});



router.get('/view-subscriber', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                     Subscriber.findAll()
                     .then(subscriber=>{

                            res.render('admin/subscriber-list', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            email: req.session.email,
                            id: req.session.userid,
                            title1,
                            navitems,
                            subscriber
        
                        });


                     })
                     .catch(err => console.log(err));

                })

                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});


router.get('/profile', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/profile', {
                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        title1,
                        navitems
    
                    });

                })

                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }

})







module.exports = router;