const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const NavItem4 = require('../../model/NavItem4');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');



User.hasMany(NavItem4);
NavItem4.belongsTo(User, {
    foreignKey: 'userId'
});


//////////NavItem4///////////////
router.get('/add-navitem4', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/navitem4-generation', {
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

router.post('/navitem4-details', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details, date1, date1_details, date2, date2_details, date3, date3_details, date4, date4_details, date5, date5_details, date6, date6_details } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details || !date1 || !date1_details || !date2 || !date2_details || !date3 || !date3_details || !date4 || !date4_details || !date5 || !date5_details || !date6 || !date6_details) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/navitem4-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        title,
                        subtitle,
                        details,
                        date1, date1_details, date2, date2_details, date3, date3_details, date4, date4_details, date5, date5_details, date6, date6_details,
                        title1,
                        navitems
        
        
                    });

                })
            })
            
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    NavItem4.findOne({ where: { userId: user.id } })
                        .then(navitem4 => {
                            if (navitem4) {
                                errors.push({ text: 'Navitem4 Details Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{
                                        res.render('admin/navitem4-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,
                                            date1, date1_details, date2, date2_details, date3, date3_details, date4, date4_details, date5, date5_details, date6, date6_details,

                                            title1,
                                            navitems,
                                            name:user.name,
                                            layout: 'admin-layout'
        
                                        });
                                    })
                                })
                               
                            }
                            else {
                                const newNavItem4 = new NavItem4({
                                    title,
                                    subtitle,
                                    details,
                                    date1, date1_details, date2, date2_details, date3, date3_details, date4, date4_details, date5, date5_details, date6, date6_details,
                                    userId: user.id,
                                    layout: 'admin-layout'
                                });
                                newNavItem4.save()
                                    .then(navitem4_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-navitem4');

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


router.get('/edit-navitem4', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                //console.log(title) ;
                NavItem4.findAll()
                    .then(navitem4 => {
                        res.render('admin/edit-navitem4', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            email: req.session.email,
                            id: req.session.userid,
                            //role: req.session.role,
                            navitem4,
                            title1

                        });
                    })


            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/edit-navitem4', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        NavItem4.findAll()
            .then(n1 => {
                let { title, subtitle, details, date1, date1_details, date2, date2_details, date3, date3_details, date4, date4_details, date5, date5_details, date6, date6_details } = req.body;
                NavItem4.update({
                    title,
                    subtitle,
                    details,
                    date1,
                    date1_details,
                    date2,
                    date2_details,
                    date3,
                    date3_details,
                    date4,
                    date4_details,
                    date5,
                    date5_details,
                    date6,
                    date6_details
                },
                    {
                        where: {}
                    }

                )
                    .then(n2 => {
                        NavItem4.findAll()
                            .then(navitem4 => {
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                        .then(navitems=>{
                                            res.render('admin/edit-navitem4', {
                                                layout: 'admin-layout',
                                                name: req.session.name,
                                                email: req.session.email,
                                                id: req.session.userid,
                                                //role: req.session.role,
                                                navitem4,
                                                alert: ' Updated Successfully',
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

module.exports=router;