const express = require('express');
const User = require('../../model/User');
const NavItems = require('../../model/NavItems');
const Title = require('../../model/Title');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');


User.hasMany(NavItems);  
NavItems.belongsTo(User, {
    foreignKey: 'userId'
});



//////NavItem//////////////
router.get('/add-navitem', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/navbar-generation', {
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
            
    } else {
        res.redirect('/auth/login');
    }
});



router.post('/add-navitem', async (req, res) => {

    if (req.session.loggedin) {

        let { navitem1, navitem2, navitem3, navitem4, navitem5, navitem6, snavitem1_6, snavitem2_6, snavitem3_6 } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!navitem1 || !navitem2 || !navitem3 || !navitem4 || !navitem5 || !navitem6 || !snavitem1_6 || !snavitem2_6 || !snavitem3_6 ) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error
            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/navbar-generation', {
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        navitem1,
                        navitem2,
                        navitem3,
                        navitem4,
                        navitem5,
                        navitem6,
                        snavitem1_6,
                        snavitem2_6,
                        snavitem3_6,
                        title1,
                        navitems,
        
                        layout: 'admin-layout'
        
        
                    });

                })
                

            })
     
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    NavItems.findOne({ where: { userId: user.id } })
                        .then(navitems => {
                            if (navitems) {
                                errors.push({ text: 'Navitems Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    
                                        res.render('admin/navbar-generation', {
                                            errors,
                                            navitem1,
                                            navitem2,
                                            navitem3,
                                            navitem4,
                                            navitem5,
                                            navitem6,
                                            snavitem1_6,
                                            snavitem2_6,
                                            snavitem3_6,
                                            title1,
                                            name: user.name,
                                            navitems,
                                            layout: 'admin-layout'
        
                                        });

                                    
                                 
                                })
                               
                            }
                            else {
                                const newNav = new NavItems({
                                    navitem1,
                                    navitem2,
                                    navitem3,
                                    navitem4,
                                    navitem5,
                                    navitem6,
                                    snavitem1_6,
                                    snavitem2_6,
                                    snavitem3_6,
                                    
                                    userId: user.id,

                                });
                                newNav.save()
                                    .then(new_nav => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-navitem');

                                    })
                                    .catch(err => console.log(err));
                            }



                        })

                });



        }
    }
    //res.render('issuer/holder-creation', { layout: 'issuer-layout', name: "" });
})



router.get('/edit-navitem', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Title.findAll()
            .then(title1 => {

                NavItems.findAll()
                    .then(navitems => {
                        //console.log(nitem);
                        res.render('admin/edit-navitem', {
                            layout: 'admin-layout',
                            name: req.session.name,
                            email: req.session.email,
                            id: req.session.userid,
                            //role: req.session.role,
                            navitems,
                            title1

                        });

                    })
                    .catch(err => console.log(err));
            })

    } else {
        res.redirect('/auth/login');
    }
});

router.post('/edit-navitem', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {

        NavItems.findAll()
            .then(nitem1 => {
                let { navitem1, navitem2, navitem3, navitem4, navitem5, navitem6, snavitem1_6, snavitem2_6, snavitem3_6} = req.body;
                NavItems.update({
                    navitem1,
                    navitem2,
                    navitem3,
                    navitem4,
                    navitem5,
                    navitem6,
                    snavitem1_6,
                    snavitem2_6,
                    snavitem3_6,
                    
                    
                },
                    {
                        where: {}
                    }

                )
                    .then(nitem2 => {
                        NavItems.findAll()
                            .then(navitems => {
                                Title.findAll()
                                    .then(title1 => {
                                        res.render('admin/edit-navitem', {
                                            layout: 'admin-layout',
                                            name: req.session.name,
                                            email: req.session.email,
                                            id: req.session.userid,
                                            //role: req.session.role,
                                            navitems,
                                            alert: 'NavItem Updated Successfully',
                                            title1
                                        });


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
