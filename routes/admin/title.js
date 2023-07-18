const express = require('express');
const User = require('../../model/User');
const db = require('../../config/database');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required } = require('yargs');
const { json } = require('body-parser');
const router = express.Router();
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');




User.hasMany(Title);
Title.belongsTo(User, {
    foreignKey: 'userId'
});





router.get('/add-title', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/title-generation', {
                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        //role: req.session.role,
                        title1,
                        navitems
                    });
                })
           

            })




    }
    else {
        res.redirect('/auth/login');
    }
});

router.post('/add-title', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error
            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/title-generation', {
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        title,
                        subtitle,

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
                    Title.findOne({ where: { userId: user.id } })
                        .then(titles => {
                            if (titles) {

                                errors.push({ text: 'Title Already Exists' });
                                Title.findAll()
                                .then(title1=>{

                                    NavItems.findAll()
                                    .then(navitems=>{
                                        res.render('admin/title-generation', {
                                            errors,
                                            title,
                                            subtitle,


                                            title1,
                                            navitems,
                                            name: user.name,
                                            layout: 'admin-layout'
        
                                        });

                                    })
                                })
                           
                            }
                            else {
                                const newTitle = new Title({
                                    title,
                                    subtitle,
                                    userId: user.id,

                                });
                                newTitle.save()
                                    .then(new_title => {
                                        req.flash('success_msg', 'Succesfully Added');
                                        res.redirect('/admin/add-title');

                                    })
                                    .catch(err => console.log(err));
                            }



                        })

                });



        }
    }
    //res.render('issuer/holder-creation', { layout: 'issuer-layout', name: "" });
})

router.get('/edit-title', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                //console.log(title) ;
                Title.findAll()
                    .then(title => {
                        NavItems.findAll()
                        .then(navitems=>{
                            res.render('admin/edit-title', {
                                layout: 'admin-layout',
                                name: req.session.name,
                                email: req.session.email,
                                id: req.session.userid,
                                //role: req.session.role,
                                title,
                                title1,
                                navitems
    
                            });

                        })
                     
                    })


            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/edit-title', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title3 => {
                let { title, subtitle } = req.body;
                Title.update({
                    title,
                    subtitle
                },
                    {
                        where: {}
                    }

                )
                    .then(title2 => {
                        Title.findAll()
                            .then(title1 => {

                                Title.findAll()
                                    .then(title => {
                                        NavItems.findAll()
                                        .then(navitems=>{
                                            res.render('admin/edit-title', {
                                                layout: 'admin-layout',
                                                name: req.session.name,
                                                email: req.session.email,
                                                id: req.session.userid,
                                                //role: req.session.role,
                                                title,
                                                alert: 'Updated Successfully',
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