const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');
const NavItem3 = require('../../model/NavItem3');
const Category = require('../../model/Category');
const Category_Details = require('../../model/Category_Details')
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');

const { upload } = require('../../middleware/multerUpload');


User.hasMany(NavItem3);
NavItem3.belongsTo(User, {
    foreignKey: 'userId'
});

Category.hasMany(Category_Details);
Category_Details.belongsTo(Category, {
    foreignKey: 'categoryId'
});



///////NavItem3//////////

router.get('/add-navitem3', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/navitem3-generation', {
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


router.post('/navitem3-details', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle } = req.body;


        //categories.forEach(category => console.log(category));

        //console.log(categories);

        let errors = [];
        //Validation
        if (!title || !subtitle) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
                .then(title1 => {
                    NavItems.findAll()
                        .then(navitems => {
                            res.render('admin/navitem3-generation', {
                                layout: 'admin-layout',
                                name: req.session.name,
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
                    NavItem3.findOne({ where: { userId: user.id } })
                        .then(navitem3 => {
                            if (navitem3) {
                                errors.push({ text: 'Navitem3 Details Exists' });
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {
                                                res.render('admin/navitem3-generation', {
                                                    errors,
                                                    title,
                                                    subtitle,

                                                    //category,

                                                    title1,
                                                    navitems,
                                                    name: user.name,

                                                    layout: 'admin-layout'

                                                });

                                            })
                                    })


                            }
                            else {
                                const newNavItem3 = new NavItem3({
                                    title,
                                    subtitle,

                                    userId: user.id,
                                    //layout: 'admin-layout'
                                });

                                newNavItem3.save()
                                    .then(s => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-navitem3');

                                    })



                            }

                        })

                });



        }

    }
    else {
        res.redirect('/auth/login');
    }
})

router.get('/edit-navitem3', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        NavItem3.findAll()
                            .then(navitem3 => {
                                res.render('admin/edit-navitem3', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    navitem3,
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

router.post('/edit-navitem3', upload.single('doc'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        NavItem3.findAll()
            .then(n1 => {
                let { title, subtitle } = req.body;


                NavItem3.update({
                    title,
                    subtitle,


                },
                    {
                        where: {}
                    }

                ).then(n3 => {

                    NavItem3.findAll()
                        .then(navitem3 => {
                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {
                                            res.render('admin/edit-navitem3', {
                                                layout: 'admin-layout',
                                                name: req.session.name,
                                                email: req.session.email,
                                                id: req.session.userid,
                                                //role: req.session.role,
                                                navitem3,
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


////////////////// WhitePaper Category  ///
router.get('/add-whitepaper-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/add-whitepaper-type', {
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

router.post('/add-whitepaper-type', upload.single('sampleFile'),async (req, res) => {

    if (req.session.loggedin) {

        let { wtype, overview, description } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!wtype || !overview ||  !description) {
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

                            res.render('admin/add-whitepaper-type', {

                                layout: 'admin-layout',
                                name: req.session.name,
                                email: req.session.email,
                                id: req.session.userid,
                                errors,

                                wtype,
                                overview,

                                title1,
                                navitems

                            });

                        })
                })

        }
        else {
            let image = req.file.filename;
            const newCategory = new Category({
                wtype,
                overview,
                description,
                picture: image
            });
            newCategory.save()
                .then(new_whitepaper_category => {
                    req.flash('success_msg', 'Added Succesfully');
                    res.redirect('/admin/add-whitepaper-type');

                })
                .catch(err => console.log(err));




        }
    }
    else {
        res.redirect('/auth/login');
    }
});


router.get('/view-whitepaper-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Category.findAll()
                            .then(wcategory => {

                                res.render('admin/view-whitepaper-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    wcategory,
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


router.get('/edit-whitepaper-type/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Category.findOne({ where: { id: req.params.id } })
                            .then(whitepaper_type => {
                                res.render('admin/edit-whitepaper-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    navitems,
                                    whitepaper_type

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


router.post('/edit-whitepaper-type/:id', upload.single('sampleFile'),async (req, res) => {

    if (req.session.loggedin) {

        let { wtype, overview, description } = req.body;
        //const hash = await bcrypt.hash(password,10);
     
        //Validation
          
            Category.findOne({ where: { id: req.params.id } })
                .then(w_type3 => {

                if(req.file){
                    let image = req.file.filename;
                    Category.update({
                        wtype,
                         overview,
                         description,
                         picture: image
                    }, {
                        where: {
                            id: w_type3.id
                        }

                    })
                        .then(s => {
                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {

                                            Category.findOne({ where: { id: w_type3.id } })
                                                .then(whitepaper_type => {

                                                    res.render('admin/edit-whitepaper-type', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        whitepaper_type,
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

                } else{

                    Category.update({
                        wtype,
                        overview,
                        description,
                        picture: w_type3.picture

                    }, {
                        where: {
                            id: w_type3.id
                        }

                    })
                        .then(s => {
                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {

                                            Category.findOne({ where: { id:w_type3.id } })
                                                .then(whitepaper_type => {

                                                    res.render('admin/edit-whitepaper-type', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        whitepaper_type,
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




        
    }
    else {
        res.redirect('/auth/login');
    }
});

router.get('/delete-whitepaper-type/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        Category.findOne({ where: { id: req.params.id } })
            .then(wtype => {

                Category.destroy({
                    where: {
                        id: wtype.id
                    }

                })

                    .then(wtype => {
                        res.redirect('/admin/view-whitepaper-type');

                    })
                    .catch(err => console.log(err));


            })

            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});

router.get('/add-whitepaper-details/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        Category.findOne({ where: { id: req.params.id } })
                            .then(whitepaper_category => {


                                res.render('admin/add-whitepaper-details', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    navitems,
                                    whitepaper_category
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

/// Categorywise white paper

router.post('/add-whitepaper-details/:id', upload.single('sampleFile'), async (req, res) => {

    if (req.session.loggedin) {

        let { title, abstract, website_link } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !abstract || !website_link) {
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

                            Category.findOne({ where: { id: req.params.id } })
                                .then(whitepaper_category => {
                                    res.render('admin/add-whitepaper-details', {

                                        errors,
                                        title, abstract, website_link,
                                        whitepaper_category,
                                        layout: 'admin-layout',
                                        navitems,
                                        title1


                                    });
                                })

                        })
                })
        }
        else {
            let image = req.file.filename;
            Category.findOne({ where: { id: req.params.id } })
                .then(wcategory => {

                    const newCategory_Details = new Category_Details({
                        title, abstract, website_link,
                        picture1:image,
                        categoryId: wcategory.id

                    });
                    newCategory_Details.save()
                        .then(whitepaper_category_details => {
                            //req.flash('success_msg', 'Added Succesfully');
                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {

                                            Category.findOne({ where: { id: req.params.id } })
                                                .then(whitepaper_category => {

                                                    res.render('admin/add-whitepaper-details', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        whitepaper_category,
                                                        alert: `Category Details Added to ${wcategory.wtype}`,
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
                })







        }
    }
    else {
        res.redirect('/auth/login');
    }
});


router.get('/view-whitepaper-details/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Category.findOne({ where: { id: req.params.id } })
                            .then(whitepaper_category => {


                                Category_Details.findAll({ where: { categoryId: whitepaper_category.id } })
                                    .then(whitepaper_list => {


                                        res.render('admin/view-whitepaper-list', {
                                            layout: 'admin-layout',
                                            name: req.session.name,
                                            email: req.session.email,
                                            id: req.session.userid,
                                            //role: req.session.role,
                                            title1,
                                            whitepaper_list,
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


router.get('/edit-whitepaper/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Category_Details.findOne({ where: { id: req.params.id } })
                            .then(whitepaper_list => {

                                res.render('admin/edit-whitepaper', {
                                    layout: 'admin-layout',
                                    admin_name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    whitepaper_list,
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


router.post('/edit-whitepaper/:id', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { title, abstract, website_link } = req.body;


        Category_Details.findOne({ where: { id: req.params.id } })
            .then(whitepaper_list3 => {


                if(req.file) {

                    let image = req.file.filename;
                    Category_Details.update({
                        title,
                        abstract,
                        website_link,
                        picture1: image
                    },
                        {
                            where: { id: whitepaper_list3.id }
                        })
                        .then(whitepaper_list2 => {
                            Category_Details.findOne({ where: { id: whitepaper_list3.id } })
                                .then(whitepaper_list => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-whitepaper', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        whitepaper_list,
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
                   

                }else{


                    Category_Details.update({
                        title,
                        abstract,
                       
                        website_link,
                        picture1: whitepaper_list3.picture
                    },
                        {
                            where: { id: whitepaper_list3.id }
                        })
                        .then(whitepaper_list2 => {
                            Category_Details.findOne({ where: { id: whitepaper_list3.id } })
                                .then(whitepaper_list => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-whitepaper', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        whitepaper_list,
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


    } else {
        res.redirect('/auth/login');
    }
});

router.get('/delete-whitepaper/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        Category_Details.findOne({ where: { id: req.params.id } })
            .then(whitepaperlist => {

                Category_Details.destroy({
                    where: {
                        id: whitepaperlist.id
                    }

                })

                    .then(whitepaper => {


                        Title.findAll()
                            .then(title1 => {
                                NavItems.findAll()
                                    .then(navitems => {
                                        Category.findOne({ where: { id: whitepaperlist.categoryId } })
                                            .then(whitepaper_category => {


                                                Category_Details.findAll({ where: { categoryId: whitepaper_category.id } })
                                                    .then(whitepaper_list => {


                                                        res.render('admin/view-whitepaper-list', {
                                                            layout: 'admin-layout',
                                                            name: req.session.name,
                                                            email: req.session.email,
                                                            id: req.session.userid,
                                                            //role: req.session.role,
                                                            title1,
                                                            whitepaper_list,
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