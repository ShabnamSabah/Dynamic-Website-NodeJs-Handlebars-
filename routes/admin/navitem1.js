const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const NavItem1 = require('../../model/NavItem1');
const bcrypt = require('bcryptjs');
const { Op, Model } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');
const { upload } = require('../../middleware/multerUpload');

User.hasMany(NavItem1);
NavItem1.belongsTo(User, {
    foreignKey: 'userId'
});

    


////////NavItem1/////////////
router.get('/add-navitem1', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {

                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/navitem1-generation', {
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
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/navitem1-details', upload.single('sampleFile'), async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details, heading, description } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details || !heading || !description) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (!req.file) {
            errors.push({ text: 'No File is Choosen' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/navitem1-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        title,
                        subtitle,
                        details,
                        heading,
                        description,
                        title1,
                        navitems
                   
        
        
                    });

                })
            })

            
        }
        else {
            let image = req.file.filename;
          
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    NavItem1.findOne({ where: { userId: user.id } })
                        .then(navitem1 => {
                            if (navitem1) {
                                errors.push({ text: 'Navitem1 Details Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{
                                        res.render('admin/navitem1-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,
                                            heading,
                                            description,
    
                                            title1,
                                            navitems,
                                            
                                            name: user.name,
                                            layout: 'admin-layout'
        
                                        });

                                    })
                                    
                                })
                               
                            }
                            else {
                                const newNavItem1 = new NavItem1({
                                    title,
                                    subtitle,
                                    details,
                                    heading,
                                    description,
                                    picture:image,
                                    userId: user.id,
                                    layout: 'admin-layout'
                                });
                                newNavItem1.save()
                                    .then(navitem1_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-navitem1');

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

router.get('/edit-navitem1', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        NavItem1.findAll()
                            .then(navitem1 => {
                                res.render('admin/edit-navitem1', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    navitem1,
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

router.post('/edit-navitem1', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        NavItem1.findAll()
            .then(n1 => {
                let { title, subtitle, details, heading, description } = req.body;

                if (req.file) {
                    let image = req.file.filename;
                
                    NavItem1.update({
                        title,
                        subtitle,
                        details,
                        heading,
                        description,
                        picture:image
                    },
                        {
                            where: {}
                        }
    
                    )
                        .then(n2 => {
                            NavItem1.findAll()
                                .then(navitem1 => {
                                    Title.findAll()
                                        .then(title1 => {
    
                                            NavItems.findAll()
                                                .then(navitems => {
    
                                                    res.render('admin/edit-navitem1', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        navitem1,
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
    
                }
                else{
                NavItem1.update({
                    title,
                    subtitle,
                    details,
                    heading,
                    description,
                    picture: n1.picture
                },
                    {
                        where: {}
                    }

                )
                    .then(n2 => {
                        NavItem1.findAll()
                            .then(navitem1 => {
                                Title.findAll()
                                    .then(title1 => {

                                        NavItems.findAll()
                                            .then(navitems => {

                                                res.render('admin/edit-navitem1', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    navitem1,
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

                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});


module.exports = router;
