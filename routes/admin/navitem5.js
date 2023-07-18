const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems');

const Creative = require('../../model/Creative');
const Advisor = require('../../model/Advisor');
const CreativeTeam = require('../../model/CreativeTeam');
const AdvisorTeam = require('../../model/AdvisorTeam');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');

const { upload } = require('../../middleware/multerUpload');

User.hasMany(Creative);
Creative.belongsTo(User, {
    foreignKey: 'userId'
});


User.hasMany(Advisor);
Advisor.belongsTo(User, {
    foreignKey: 'userId'
});


/////////////////////////////////////////////////////////////////////////


router.get('/add-creative', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/creative-generation', {
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

router.post('/add-creative', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details, subheading1, subheading2, subheading3 } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details || !subheading1 || !subheading2 || !subheading3) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error


            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/creative-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        title,
                        subtitle,
                        details,
                        subheading1,
                        subheading2,
                        subheading3,
                        title1,
                        navitems,
                       
        
        
                    });

                })
            })
            
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    Creative.findOne({ where: { userId: user.id } })
                        .then(creatives => {
                            if (creatives) {
                                errors.push({ text: 'Creative Already Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{
                                        res.render('admin/creative-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,
                                            subheading1,
                                            subheading2,
                                            subheading3,

                                            title1,
                                            navitems,
                                            name: user.name,
                                            layout: 'admin-layout'
        
                                        });

                                    })
                                })
                             
                            }
                            else {
                                const newCreative = new Creative({
                                    title,
                                    subtitle,
                                    details,
                                    subheading1,
                                    subheading2,
                                    subheading3,
                                    userId: user.id,
                                   
                                });
                                newCreative.save()
                                    .then(new_creative => {
                                        req.flash('success_msg', 'Succesfully Added');
                                        res.redirect('/admin/add-creative');

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
    //res.render('issuer/holder-creation', { layout: 'issuer-layout', name: "" });
})


router.get('/edit-creative', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Creative.findAll()
                            .then(creative => {
                                res.render('admin/edit-creative', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    creative,
                                    title1,
                                    navitems

                                });
                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err));
            })
        //console.log(title) ;

    } else {
        res.redirect('/auth/login');
    }
});

router.post('/edit-creative', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Creative.findAll()
            .then(creative3 => {
                let { title, subtitle, details, subheading1, subheading2, subheading3 } = req.body;
                Creative.update({
                    title,
                    subtitle,
                    details, subheading1, subheading2, subheading3
                },
                    {
                        where: {}
                    }

                )
                    .then(creative2 => {
                        Title.findAll()
                            .then(title1 => {
                                NavItems.findAll()
                                    .then(navitems => {

                                        Creative.findAll()
                                            .then(creative => {
                                                res.render('admin/edit-creative', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    creative,
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


            })
    } else {
        res.redirect('/auth/login');
    }
});




router.get('/add-advisor', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/advisor-generation', {
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

router.post('/add-advisor', async (req, res) => {

    if (req.session.loggedin) {

        let { title, subtitle, details } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!title || !subtitle || !details) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error
            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/advisor-generation', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
                        title,
                        subtitle,
                        details,
                        title1,
                        navitems,
                       
        
        
                    });

                })
            })
       
        }
        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    Advisor.findOne({ where: { userId: user.id } })
                        .then(advisor => {
                            if (advisor) {
                                errors.push({ text: 'Advisor Already Exists' });

                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{

                                        res.render('admin/advisor-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,
        
                                            title1,
                                            navitems,
                                            name: user.name,
                                            layout: 'admin-layout'
        
                                        });
                                    })
                                })
                              
                            }
                            else {
                                const newAdvisor = new Advisor({
                                    title,
                                    subtitle,
                                    details,
                                    userId: user.id,
                                    
                                });
                                newAdvisor.save()
                                    .then(new_advisor => {
                                        req.flash('success_msg', 'Succesfully Added');
                                        res.redirect('/admin/add-advisor');

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


router.get('/edit-advisor', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                //console.log(title) ;
                NavItems.findAll()
                    .then(navitems => {

                        Advisor.findAll()
                            .then(advisor => {
                                res.render('admin/edit-advisor', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    advisor,
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

router.post('/edit-advisor', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Advisor.findAll()
            .then(advisor3 => {
                let { title, subtitle, details, } = req.body;
                Advisor.update({
                    title,
                    subtitle,
                    details
                },
                    {
                        where: {}
                    }

                )
                    .then(advisor2 => {
                        Title.findAll()
                            .then(title1 => {
                                NavItems.findAll()
                                    .then(navitems => {
                                        Advisor.findAll()
                                            .then(advisor => {
                                                res.render('admin/edit-advisor', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    advisor,
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
//// Creative Team //////



router.get('/add-creative-team', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/creative-team-generation', {
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

router.post('/add-creative-team', upload.single('sampleFile'), (req, res) => {

    console.log(req.session);
    if (req.session.loggedin) {

        let { cmember_name, role, linkedin_link, fb_link, github_link } = req.body;
        let errors = [];

        if (!cmember_name || !role || !linkedin_link || !fb_link || !github_link) {
            errors.push({ text: 'Please Fill In All Fields' });
        }

        if (!req.file) {
            errors.push({ text: 'No File is Choosen' });
        }

        if (errors.length > 0) {

            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/creative-team-generation', {
                        layout: 'admin-layout',
                        errors,
                        cmember_name,
                         role, 
                         linkedin_link, 
                         fb_link, 
                         github_link,

                        title1,
                        navitems,
                        name: req.session.name,        
                        
                    })
        

                })
            })
         
        }

        else {
            let image = req.file.filename;
            const newCreativeTeam = new CreativeTeam({
                cmember_name,
                role,
                picture: image,
                linkedin_link, fb_link, github_link
            })
            newCreativeTeam.save()
                .then(creativeTeam => {
                    req.flash('success_msg', 'Succesfully Added');
                    res.redirect('/admin/add-creative-team');
                }).catch(err => console.log(err));
        }
    }
    else {
        res.redirect('/auth/login');
    }

})
router.get('/view-creative-team', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        CreativeTeam.findAll()
                            .then(creativeteam => {

                                res.render('admin/creative-team-list', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    creativeteam,
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

router.get('/edit-creative-team/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        CreativeTeam.findOne({ where: { id: req.params.id } })
                            .then(creativeteam => {

                                res.render('admin/edit-creative-team', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    creativeteam,
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

router.post('/edit-creative-team/:id', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let {cmember_name, role, linkedin_link, fb_link, github_link } = req.body;
        //let image = req.file.filename;

        CreativeTeam.findOne({ where: { id: req.params.id } })
            .then(creativeteam3 => {

                if (req.file) {
                    let image = req.file.filename;
                    CreativeTeam.update({
                        cmember_name, role, linkedin_link, fb_link, github_link, picture: image
                    },
                        {
                            where: { id: creativeteam3.id }
                        })
                        .then(creativeteam2 => {
                            CreativeTeam.findOne({ where: { id: creativeteam3.id } })
                                .then(creativeteam => {
                                    Title.findAll()
                                        .then(title1 => {
                                            res.render('admin/edit-creative-team', {
                                                layout: 'admin-layout',
                                                name: req.session.name,
                                                email: req.session.email,
                                                id: req.session.userid,
                                                //role: req.session.role,
                                                creativeteam,
                                                alert: 'Updated Successfully',
                                                title1
                                            });


                                        })
                                        .catch(err => console.log(err));


                                })
                                .catch(err => console.log(err));

                        })
                        .catch(err => console.log(err));


                } else {

                    CreativeTeam.update({
                        cmember_name, role, linkedin_link, fb_link, github_link, picture: creativeteam3.picture
                    },
                        {
                            where: { id: creativeteam3.id }
                        }

                    )
                        .then(creativeteam2 => {
                            CreativeTeam.findOne({ where: { id: creativeteam3.id } })
                                .then(creativeteam => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-creative-team', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        creativeteam,
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

router.get('/delete-creative-team/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        CreativeTeam.findOne({ where: { id: req.params.id } })
            .then(creativeteam => {

                CreativeTeam.destroy({
                    where: {
                        id: creativeteam.id
                    }

                })

                    .then(creativeTeam => {
                        res.redirect('/admin/view-creative-team');

                    })
                    .catch(err => console.log(err));


            })

            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});


////// Advisor Team /////
router.get('/add-advisor-team', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/advisor-team-generation', {
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

router.post('/add-advisor-team', upload.single('sampleFile'), (req, res) => {

    console.log(req.session);
    if (req.session.loggedin) {
        let { amember_name, role, linkedin_link, fb_link, github_link } = req.body;
        let errors = [];

        if (!amember_name || !role || !linkedin_link || !fb_link || !github_link) {
            errors.push({ text: 'Please Fill In All Fields' })
        }

        if (!req.file) {
            errors.push({ text: 'No File is Choosen' });
        }

        if (errors.length > 0) {

            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{
                    res.render('admin/advisor-team-generation', {
                        errors,
                        amember_name, role, linkedin_link, fb_link, github_link,

                        title1,
                        navitems,
                        name: req.session.name,
                        layout: 'admin-layout'

                    })
        
                })

            })
           
        }

        else {
            let image = req.file.filename;
            const newAdvisorTeam = new AdvisorTeam({
                amember_name,
                role,
                picture: image,
                linkedin_link, fb_link, github_link
            })
            newAdvisorTeam.save()
                .then(advisorTeam => {
                    req.flash('success_msg', 'Succesfully Added');
                    res.redirect('/admin/add-advisor-team');
                }).catch(err => console.log(err));
        }

    }
    else {
        res.redirect('/auth/login');
    }
})

router.get('/view-advisor-team', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        AdvisorTeam.findAll()
                            .then(advisorteam => {

                                res.render('admin/advisor-team-list', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    advisorteam,
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

router.get('/edit-advisor-team/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        AdvisorTeam.findOne({ where: { id: req.params.id } })
                            .then(advisorteam => {

                                res.render('admin/edit-advisor-team', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    advisorteam,
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



router.post('/edit-advisor-team/:id', upload.single('sampleFile'), async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { amember_name, role, linkedin_link, fb_link, github_link } = req.body;
        //let image = req.file.filename;

        AdvisorTeam.findOne({ where: { id: req.params.id } })
            .then(advisorteam3 => {

                if (req.file) {
                    let image = req.file.filename;
                    AdvisorTeam.update({
                        amember_name, role, linkedin_link, fb_link, github_link, picture: image
                    },
                        {
                            where: { id: advisorteam3.id }
                        })
                        .then(advisorteam2 => {
                            AdvisorTeam.findOne({ where: { id: advisorteam3.id } })
                                .then(advisorteam => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-advisor-team', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        advisorteam,
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

                } else {

                    AdvisorTeam.update({
                        amember_name, role, linkedin_link, fb_link, github_link, picture: advisorteam3.picture
                    },
                        {
                            where: { id: advisorteam3.id }
                        }

                    )
                        .then(advisorteam2 => {
                            AdvisorTeam.findOne({ where: { id: advisorteam3.id } })
                                .then(advisorteam => {
                                    Title.findAll()
                                        .then(title1 => {
                                            NavItems.findAll()
                                                .then(navitems => {
                                                    res.render('admin/edit-advisor-team', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        advisorteam,
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

router.get('/delete-advisor-team/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        AdvisorTeam.findOne({ where: { id: req.params.id } })
            .then(advisorteam => {

                AdvisorTeam.destroy({
                    where: {
                        id: advisorteam.id
                    }

                })

                    .then(advisorTeam => {
                        res.redirect('/admin/view-advisor-team');

                    })
                    .catch(err => console.log(err));


            })

            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;