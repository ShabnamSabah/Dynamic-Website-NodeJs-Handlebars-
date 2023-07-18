const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const SubNavItem1_6 = require('../../model/SubNavItem1_6');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');

User.hasMany(SubNavItem1_6);
SubNavItem1_6.belongsTo(User, {
    foreignKey: 'userId'
});





router.get('/add-subnavitem1_6', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {

                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/subnavitem1_6-generation', {
                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        //role: req.session.role,
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

router.post('/add-subnavitem1_6', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details, heading1, h1_details, heading2, h2_details, heading3, h3_details, heading4, h4_details } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details || !heading1 || !h1_details || !heading2 || !h2_details || !heading3 || !h3_details || !heading4 || !h4_details) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error
            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/subnavitem1_6-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
        
                        title,
                        subtitle,
                        details,
                        heading1,
                        h1_details,
                        heading2,
                        h2_details, heading3, h3_details, heading4, h4_details,

                        title1,
                        navitems
        
                    });

                })
            })
         
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                  SubNavItem1_6.findOne({ where: { userId: user.id } })
                        .then(subnavitem1_6 => {
                            if (subnavitem1_6 ) {
                                errors.push({ text: `SubNavitem1 of NavItem6's Details Exists` });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{
                                        res.render('admin/subnavitem1_6-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,
                                            heading1,
                                            h1_details,
                                            heading2,
                                            h2_details, heading3, h3_details, heading4, h4_details,

                                            title1,
                                            navitems,
                                            name :user.name,
                                            layout: 'admin-layout'
        
                                        });
                                    })
                                })
                       
                            }
                            else {
                                const newSubNavItem1_6 = new SubNavItem1_6({
                                    title,
                                    subtitle,
                                    details,
                                    heading1,
                                    h1_details,
                                    heading2,
                                    h2_details, heading3, h3_details, heading4, h4_details,
                                    userId: user.id,
                                    layout: 'admin-layout'
                                });
                                newSubNavItem1_6.save()
                                    .then(subnavitem1_6_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-subnavitem1_6');

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




router.get('/edit-subnavitem1_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                //console.log(title) ;
                NavItems.findAll()
                .then(navitems=>{
                    SubNavItem1_6.findAll()
                    .then(subnavitem1_6 => {
                        res.render('admin/edit-subnavitem1_6', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            email: req.session.email,
                            id: req.session.userid,
                            //role: req.session.role,
                            subnavitem1_6,
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

router.post('/edit-subnavitem1_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
       SubNavItem1_6.findAll()
            .then(n1 => {
                let { title, subtitle, details, heading1, h1_details, heading2, h2_details, heading3, h3_details, heading4, h4_details } = req.body;
                SubNavItem1_6.update({
                    title,
                    subtitle,
                    details,
                    heading1,
                    h1_details,
                    heading2,
                    h2_details, heading3, h3_details, heading4, h4_details
                },
                    {
                        where: {}
                    }

                )
                    .then(n2 => {
                        SubNavItem1_6.findAll()
                            .then(subnavitem1_6 => {
                                Title.findAll()
                                    .then(title1 => {
                                           NavItems.findAll()
                                           .then(navitems=>{

                                                 res.render('admin/edit-subnavitem1_6', {
                                                layout: 'admin-layout',
                                                name: req.session.name,
                                                email: req.session.email,
                                                id: req.session.userid,
                                                //role: req.session.role,
                                                subnavitem1_6,
                                                alert: ' Updated Successfully',
                                                title1,
                                                navitems
                                            });

                                           })
                                     
                                    })


                            })
                    })
                    .catch(err => console.log(err));


            })
    } else {
        res.redirect('/auth/login');
    }
});


module.exports=router;