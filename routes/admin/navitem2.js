const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const NavItem2 = require('../../model/NavItem2');
const Solution_Category = require('../../model/Solution_Category');
const Solution_Details = require('../../model/Solution_Details');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');
const { upload } = require('../../middleware/multerUpload');
const { timeLog } = require('console');


User.hasMany(NavItem2);
NavItem2.belongsTo(User, {
    foreignKey: 'userId'
});


Solution_Category.hasMany(Solution_Details);
Solution_Details.belongsTo(Solution_Category, {
    foreignKey: 'solutionCategoryId'
});




//////Navitem2///////////



router.get('/add-navitem2', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/navitem2-generation', {
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

router.post('/navitem2-details', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle ) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
                .then(title1 => {
                    NavItems.findAll()
                        .then(navitems => {

                            res.render('admin/navitem2-generation', {

                                layout: 'admin-layout',
                                name: req.session.name,
                                email: req.session.email,
                                id: req.session.userid,
                                errors,

                                title,
                                subtitle,
                                
                                title1,
                                navitems

                            });

                        })
                })

        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {

                    NavItem2.findOne({ where: { userId: user.id } })
                        .then(navitem2 => {
                            if (navitem2) {
                                errors.push({ text: 'Navitem2 Details Exists' });
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {

                                                res.render('admin/navitem2-generation', {
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
                                const newNavItem2 = new NavItem2({
                                    title,
                                    subtitle,

                         
                                    userId: user.id,

                                });
                                newNavItem2.save()
                                    .then(navitem2_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-navitem2');

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
});




router.get('/edit-navitem2', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        NavItem2.findAll()
                            .then(navitem2 => {
                                res.render('admin/edit-navitem2', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    navitem2,
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

router.post('/edit-navitem2', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        NavItem2.findAll()
            .then(n1 => {
                let { title, subtitle, details } = req.body;
                NavItem2.update({
                    title,
                    subtitle,
                

                },
                    {
                        where: {}
                    }

                )
                    .then(n2 => {
                        NavItem2.findAll()
                            .then(navitem2 => {
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll
                                            .then(navitems => {
                                                res.render('admin/edit-navitem2', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    navitem2,
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
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});

/////////////////////////////////////////

/// Solutions Type

router.get('/add-solution-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/add-solution-type', {
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


router.post('/add-solution-type', upload.single('sampleFile'), async (req, res) => {

    if (req.session.loggedin) {

        let { stype, overview, description, use_case } = req.body;


        //categories.forEach(category => console.log(category));

        //console.log(categories);

        let errors = [];
        //Validation
        if (!stype || !overview || !description) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (!req.file) {
            errors.push({ text: 'No File is Choosen' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
                .then(title1 => {
                    NavItems.findAll()
                        .then(navitems => {
                            res.render('admin/add-solution-type', {
                                layout: 'admin-layout',
                                name: req.session.name,
                                errors,
                                stype,
                                overview, description, use_case, 
                                title1,
                                navitems




                            });

                        })
                })

        }
        else {
            let image = req.file.filename;


            const newSolution_Category = new Solution_Category({
                stype,
                overview, description, use_case, 
                picture: image
                //layout: 'admin-layout'
            });

            newSolution_Category.save()
                .then(s => {
                    req.flash('success_msg', 'Added Succesfully');
                    res.redirect('/admin/add-solution-type');

                })

        }
    }
    else {
        res.redirect('/auth/login');
    }
});


router.get('/view-solution-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Solution_Category.findAll()
                            .then(solution_type => {

                                res.render('admin/view-solution-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    solution_type,
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
})

router.get('/edit-solution-type/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Solution_Category.findOne({ where: { id: req.params.id } })
                            .then(solution_type => {
                                res.render('admin/edit-solution-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    navitems,
                                    solution_type

                                });

                            })



                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/edit-solution-type/:id', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { stype, overview, description, use_case} = req.body;
        //let image = req.file.filename;

        Solution_Category.findOne({ where: { id: req.params.id } })
            .then(solution_type3 => {

                if (req.file) {
                    let image = req.file.filename;
                    Solution_Category.update({
                        stype,  overview, description, use_case,  picture: image
                    },
                        {
                            where: { id: solution_type3.id }
                        })
                        .then(solutiontype2 => {
                            Solution_Category.findOne({ where: { id: solution_type3.id } })
                                .then(solution_type => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-solution-type', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        solution_type,
                                                        alert: 'Updated Successfully',
                                                        title1,
                                                        navitems
                                                    });

                                                })


                                        })
                                        .catch(err => console.log(err));


                                })
                                .catch(err => console.log(err));

                        })
                        .catch(err => console.log(err));


                } else {

                    Solution_Category.update({
                        stype,  overview, description, use_case, picture: solution_type3.picture
                    },
                        {
                            where: { id: solution_type3.id }
                        }

                    )
                        .then(solution_type2 => {
                            Solution_Category.findOne({ where: { id: solution_type3.id } })
                                .then(solution_type => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-solution-type', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        solution_type,
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


                }


            })
            .catch(err => console.log(err));


    } else {
        res.redirect('/auth/login');
    }
});


router.get('/delete-solution-type/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        Solution_Category.findOne({ where: { id: req.params.id } })
            .then(stype => {

                Solution_Category.destroy({
                    where: {
                        id: stype.id
                    }

                })

                    .then(stype => {
                        res.redirect('/admin/view-solution-type');

                    })
                    .catch(err => console.log(err));


            })

            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});

//// Category Wise Solution


router.get('/add-solution-details/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        Solution_Category.findOne({ where: { id: req.params.id } })
                            .then(solution_category => {

                                res.render('admin/add-solution-details', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    navitems,
                                    solution_category

                                });

                            })



                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
})


router.post('/add-solution-details/:id', upload.single('sampleFile'), async (req, res) => {

    if (req.session.loggedin) {

        let { title, overview1, description1} = req.body;
 

        //categories.forEach(category => console.log(category));

        //console.log(categories);

        let errors = [];
        //Validation
        if (!title || !overview1 || !description1) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (!req.file) {
            errors.push({ text: 'No File is Choosen' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
                .then(title1 => {
                    NavItems.findAll()
                        .then(navitems => {
                            res.render('admin/add-solution-details', {
                                layout: 'admin-layout',
                                name: req.session.name,
                                errors,
                                title, overview1, description1,
                                title1,
                                navitems




                            });

                        })
                })

        }
        else {
            let image = req.file.filename;
          

            Solution_Category.findOne({ where: { id: req.params.id } })
                .then(wcategory => {

                    const newSolution_Details = new Solution_Details({
                        title, overview1, description1,
                        picture1: image,
                        solutionCategoryId: wcategory.id
                        //layout: 'admin-layout'
                    });

                    newSolution_Details.save()
                        .then(s => {

                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {

                                            Solution_Category.findOne({ where: { id: req.params.id } })
                                                .then(solution_category => {

                                                    res.render('admin/add-solution-details', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        solution_category,
                                                        alert: `Details Added to ${wcategory.stype}`,
                                                        title1,
                                                        navitems
                                                    });

                                                })


                                        })
                                        .catch(err => console.log(err));



                                })
                                .catch(err => console.log(err));
                            //res.redirect('/admin/add-solution-details');

                        })

                })

        }

    }
    else {
        res.redirect('/auth/login');
    }
});

router.get('/view-solution-details/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Solution_Category.findOne({ where: { id: req.params.id } })
                            .then(solution_category => {


                                Solution_Details.findAll({ where: { solutionCategoryId: solution_category.id } })
                                    .then(service_list => {


                                        res.render('admin/view-service-list', {
                                            layout: 'admin-layout',
                                            name: req.session.name,
                                            email: req.session.email,
                                            id: req.session.userid,
                                            //role: req.session.role,
                                            title1,
                                            service_list,
                                            navitems
                                        });

                                    })



                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err));



            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/auth/login');
    }
})



router.get('/edit-service/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {



                        Solution_Details.findOne({ where: { id: req.params.id } })
                            .then(sdetails => {

                                res.render('admin/edit-solution-details', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    sdetails,

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
})



router.post('/edit-service/:id', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { title, overview1, description1 } = req.body;



        Solution_Details.findOne({ where: { id: req.params.id } })
            .then(sdetails3 => {

                if (req.file) {
                    let image = req.file.filename;
                    Solution_Details.update({
                        title,
                        overview1,
                        description1,

                        picture1: image,

                    },
                     {
                            where: { id: sdetails3.id }
                    })
                     .then(sdetails2 => {

                            Solution_Details.findOne({ where: { id: sdetails3.id } })
                                .then(sdetails => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-solution-details', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        
                                                        sdetails,
                                                        alert: 'Updated Successfully',
                                                        title1,
                                                        navitems
                                                    });


                                                })
                                                .catch(err => console.log(err));


                                        })




                                })


                        })
                        .catch(err => console.log(err));
                    
                }
                 else {

                    Solution_Details.update({
                        title,
                       overview1, description1,
                        picture1: sdetails3.picture,
                    },
                        {
                            where: { id: sdetails3.id }
                        })
                        .then(sdetails2 => {


                            Solution_Details.findOne({ where: { id: sdetails3.id } })
                                .then(sdetails => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-solution-details', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                    
                                                        sdetails,
                                                        alert: 'Updated Successfully',
                                                        title1,
                                                        navitems
                                                    });
                                                })



                                        })
                                        .catch(err => console.log(err));




                                })
                            })
                        
                    }
            })

                } else {
                    res.redirect('/auth/login');
                }
            });

     

        router.get('/delete-service/:id', async (req, res) => {
            console.log(req.session);
            if (req.session.loggedin) {


                Solution_Details.findOne({ where: { id: req.params.id } })
                    .then(service => {

                        Solution_Details.destroy({
                            where: {
                                id: service.id
                            }

                        })

                            .then(qanswer => {


                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {
                                                Solution_Category.findOne({ where: { id: service.solutionCategoryId } })
                                                    .then(sl => {


                                                        Solution_Details.findAll({ where: { solutionCategoryId: sl.id } })
                                                            .then(service_list => {


                                                                res.render('admin/view-service-list', {
                                                                    layout: 'admin-layout',
                                                                    name: req.session.name,
                                                                    email: req.session.email,
                                                                    id: req.session.userid,
                                                                    //role: req.session.role,
                                                                    title1,
                                                                    service_list,
                                                                    navitems
                                                                });

                                                            })

                                                    })


                                            })
                                            .catch(err => console.log(err));
                                    })
                            })
                            .catch(err => console.log(err));

                    })

                    .catch(err => console.log(err));

            } else {
                res.redirect('/auth/login');
            }
        });

        module.exports = router;