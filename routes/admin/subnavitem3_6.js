const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const SubNavItem3_6 = require('../../model/SubNavItem3_6');
const bcrypt = require('bcryptjs');
const { Op, Model } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');

User.hasMany(SubNavItem3_6);
    SubNavItem3_6.belongsTo(User, {
        foreignKey: 'userId'
    });
    
 



router.get('/add-subnavtem3_6', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/subnavtem3_6-generation', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            admin_email: req.session.email,
                            id: req.session.userid,
                            //role: req.session.role,
                            title1,
                            navitems

                        });

                    })


            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});


router.post('/add-subnavtem3_6', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details, phone, email, telegram_link, linkedin_link, fb_link, github_link } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details || !phone || !email || !telegram_link || !linkedin_link || !fb_link || !github_link) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/subnavtem3_6-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
        
                        title,
                        subtitle,
                        details, phone, email, telegram_link, linkedin_link, fb_link, github_link,

                        title1,
                        navitems
        
                    });

                })
            })
           
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    SubNavItem3_6.findOne({ where: { userId: user.id } })
                        .then(subnavtem3_6 => {
                            if (subnavtem3_6) {
                                errors.push({ text: 'SubNavitem4 of NavItem6  Details Already Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{

                                        res.render('admin/subnavtem3_6-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details, phone, email, telegram_link, linkedin_link, fb_link, github_link,

                                            title1,
                                            navitems,
                                            name: user.name,
                                            layout: 'admin-layout'
        
                                        });
                                    })
                                })
                             
                            }
                            else {
                                const newSubNavItem3_6 = new SubNavItem3_6({
                                    title,
                                    subtitle,
                                    details, phone, email, telegram_link, linkedin_link, fb_link, github_link,
                                    userId: user.id,
                                    layout: 'admin-layout'
                                });
                                newSubNavItem3_6.save()
                                    .then(zubnavitem4_6_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-subnavtem3_6');

                                    })
                                    .catch(err => console.log(err));
                            }



                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));



        }
    }
    else {
        res.redirect('/auth/login');
    }
})


router.get('/edit-subnavtem3_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                //console.log(title) ;
                NavItems.findAll()
                    .then(navitems => {

                        SubNavItem3_6.findAll()
                            .then(subnavtem3_6 => {
                                res.render('admin/edit-subnavtem3_6', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    admin_email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    subnavtem3_6,
                                    title1,
                                    navitems

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

router.post('/edit-subnavtem3_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        SubNavItem3_6.findAll()
            .then(subnavtem3_6_1 => {
                let { title, subtitle, details, phone, email, telegram_link, linkedin_link, fb_link, github_link } = req.body;
                SubNavItem3_6.update({
                    title,
                    subtitle,
                    details, phone, email, telegram_link, linkedin_link, fb_link, github_link
                },
                    {
                        where: {}
                    }

                )
                    .then(subnavtem3_6_2 => {
                        Title.findAll()
                            .then(title1 => {
                                NavItems.findAll()
                                    .then(navitems => {

                                        SubNavItem3_6.findAll()
                                            .then(subnavtem3_6 => {
                                                res.render('admin/edit-subnavtem3_6', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    admin_email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    subnavtem3_6,
                                                    alert: 'Updated Successfully',
                                                    title1,
                                                    navitems
                                                });

                                            })
                                            .catch(err => console.log(err));

                                    })
                                    .catch(err => console.log(err));


                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err));


            })
    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;