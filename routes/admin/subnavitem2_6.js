const express = require('express');
const User = require('../../model/User');
const Title = require('../../model/Title');
const NavItems = require('../../model/NavItems')
const SubNavItem2_6 = require('../../model/SubNavItem2_6');
const Question_Category = require('../../model/Question_Category');
const QuestionAnswer = require('../../model/QuestionAnswer');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { required, array } = require('yargs');
const { json } = require('body-parser');
const { func } = require('joi');
const router = express.Router();
const path = require('path');


User.hasMany(SubNavItem2_6);
SubNavItem2_6.belongsTo(User, {
    foreignKey: 'userId'
});


Question_Category.hasMany(QuestionAnswer);
QuestionAnswer.belongsTo(Question_Category, {
    foreignKey: 'questionCategoryId'
});


router.get('/add-subnavitem2_6', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/subnavitem2_6-generation', {
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


router.post('/add-subnavitem2_6', async (req, res) => {

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

                    res.render('admin/subnavitem2_6-generation', {

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
                    SubNavItem2_6.findOne({ where: { userId: user.id } })
                        .then(navitem2 => {
                            if (navitem2) {
                                errors.push({ text: 'SubNavitem2_6 Details Exists' });
                                Title.findAll()
                                .then(title1=>{
                                    NavItems.findAll()
                                    .then(navitems=>{

                                        res.render('admin/subnavitem2_6-generation', {
                                            errors,
                                            title,
                                            subtitle,
                                            details,

                                            title1,
                                            navitems,
                                            name:user.name,
                                            layout: 'admin-layout'
        
                                        });
                                    })
                                })
                               
                            }
                            else {
                                const newSubNavItem2_6 = new SubNavItem2_6({
                                    title,
                                    subtitle,
                                    details,
                                    userId: user.id,
                                    layout: 'admin-layout'
                                });
                                newSubNavItem2_6.save()
                                    .then(navitem2_6_details => {
                                        req.flash('success_msg', 'Added Succesfully');
                                        res.redirect('/admin/add-subnavitem2_6');

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


router.get('/edit-subnavitem2_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        SubNavItem2_6.findAll()
                            .then(subnavitem2_6 => {
                                res.render('admin/edit-subnavitem2_6', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    subnavitem2_6,
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

router.post('/edit-subnavitem2_6', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        SubNavItem2_6.findAll()
            .then(n1 => {
                let { title, subtitle, details } = req.body;
                SubNavItem2_6.update({
                    title,
                    subtitle,
                    details

                },
                    {
                        where: {}
                    }

                )
                    .then(n2 => {
                        SubNavItem2_6.findAll()
                            .then(subnavitem2_6 => {
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {
                                                res.render('admin/edit-subnavitem2_6', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    subnavitem2_6,
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


/////////////////////////Question Type///////////////////////


router.get('/add-question-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        res.render('admin/add-question-type', {
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

router.post('/add-question-type', async (req, res) => {

    if (req.session.loggedin) {

        let { qtype } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!qtype) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error
            Title.findAll()
            .then(title1=>{
                NavItems.findAll()
                .then(navitems=>{

                    res.render('admin/add-question-type', {

                        layout: 'admin-layout',
                        name: req.session.name,
                        email: req.session.email,
                        id: req.session.userid,
                        errors,
        
                        qtype,

                        title1,
                        navitems
        
                    });

                })
            })
           
        }
        else {

            const newQuestion_Category = new Question_Category({
                qtype
            });
            newQuestion_Category.save()
                .then(new_question_category => {
                    req.flash('success_msg', 'Added Succesfully');
                    res.redirect('/admin/add-question-type');

                })
                .catch(err => console.log(err));




        }
    }
    else {
        res.redirect('/auth/login');
    }
});


/*router.get('/view-question-type', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Question_Category.findAll()
                            .then(question_category => {

                                res.render('admin/view-question-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    question_category,
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
*/

router.get('/edit-question-category/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Question_Category.findOne({ where: { id: req.params.id } })
                            .then(question_category => {

                                res.render('admin/edit-question-type', {
                                    layout: 'admin-layout',
                                    admin_name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    question_category,
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



router.post('/edit-question-category/:id', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { qtype } = req.body;


        Question_Category.findOne({ where: { id: req.params.id } })
            .then(question_category3 => {


                Question_Category.update({
                    qtype
                },
                    {
                        where: { id: question_category3.id }
                    })
                    .then(question_category2 => {
                        Question_Category.findOne({ where: { id: question_category3.id } })
                            .then(question_category => {
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {
                                                res.render('admin/edit-question-type', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    question_category,
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

router.get('/delete-question-category/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        Question_Category.findOne({ where: { id: req.params.id } })
            .then(question_category => {

                Question_Category.destroy({
                    where: {
                        id: question_category.id
                    }

                })

                    .then(qcategory => {
                        res.redirect('/admin/view-question-type');

                    })
                    .catch(err => console.log(err));


            })

            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});

////////////////////Add Question To Category///////////



router.get('/view-question-category', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Question_Category.findAll()
                            .then(question_category => {

                                res.render('admin/view-category-type', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    question_category,
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


router.get('/add-question-answer/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {
                        Question_Category.findOne({ where: { id: req.params.id } })
                            .then(question_category => {


                                res.render('admin/add-question-answer', {
                                    layout: 'admin-layout',
                                    name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    navitems,
                                    question_category
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



router.post('/add-question-answer/:id', async (req, res) => {

    if (req.session.loggedin) {

        let { question, answer } = req.body;
        //const hash = await bcrypt.hash(password,10);
        let errors = [];
        //Validation
        if (!question || !answer) {
            errors.push({ text: 'Please fill in all the fields' });
        }

        if (errors.length > 0) {
            //error

            Title.findAll()
                .then(title1 => {
                    NavItems.findAll()
                        .then(navitems => {

                            Question_Category.findOne({ where: { id: req.params.id } })
                                .then(question_category => {
                                    res.render('admin/add-question-answer', {
                                        errors,
                                        question,
                                        answer,
                                        question_category,
                                        layout: 'admin-layout',
                                        navitems,
                                        title1,
                                        name: req.session.name

                                    });
                                })

                        })
                })
        }
        else {
            Question_Category.findOne({ where: { id: req.params.id } })
                .then(qcategory => {

                    const newQuestionAnswer = new QuestionAnswer({
                        question,
                        answer,
                        questionCategoryId: qcategory.id

                    });
                    newQuestionAnswer.save()
                        .then(question_answer_details => {
                            //req.flash('success_msg', 'Added Succesfully');
                            Title.findAll()
                                .then(title1 => {
                                    NavItems.findAll()
                                        .then(navitems => {

                                            Question_Category.findOne({ where: { id: req.params.id } })
                                                .then(question_category => {

                                                    res.render('admin/add-question-answer', {
                                                        layout: 'admin-layout',
                                                        name: req.session.name,
                                                        email: req.session.email,
                                                        id: req.session.userid,
                                                        //role: req.session.role,
                                                        question_category,
                                                        alert: `Question Answer Added to ${qcategory.qtype}`,
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




router.get('/view-question-answer/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        Question_Category.findOne({ where: { id: req.params.id } })
                            .then(question_category => {


                                QuestionAnswer.findAll({ where: { questionCategoryId: question_category.id } })
                                    .then(question_answer => {


                                        res.render('admin/view-question-answer', {
                                            layout: 'admin-layout',
                                            name: req.session.name,
                                            email: req.session.email,
                                            id: req.session.userid,
                                            //role: req.session.role,
                                            title1,
                                            question_answer,
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


router.get('/edit-question-answer/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {
        Title.findAll()
            .then(title1 => {
                NavItems.findAll()
                    .then(navitems => {

                        QuestionAnswer.findOne({ where: { id: req.params.id } })
                            .then(question_answer => {

                                res.render('admin/edit-question-answer', {
                                    layout: 'admin-layout',
                                    admin_name: req.session.name,
                                    email: req.session.email,
                                    id: req.session.userid,
                                    //role: req.session.role,
                                    title1,
                                    question_answer,
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


router.post('/edit-question-answer/:id', async (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        let { question, answer } = req.body;


        QuestionAnswer.findOne({ where: { id: req.params.id } })
            .then(question_answer3 => {


                QuestionAnswer.update({
                    question,
                    answer
                },
                    {
                        where: { id: question_answer3.id }
                    })
                    .then(question_answer2 => {
                        QuestionAnswer.findOne({ where: { id: question_answer3.id } })
                            .then(question_answer => {
                                Title.findAll()
                                    .then(title1 => {
                                        NavItems.findAll()
                                            .then(navitems => {
                                                res.render('admin/edit-question-answer', {
                                                    layout: 'admin-layout',
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    id: req.session.userid,
                                                    //role: req.session.role,
                                                    question_answer,
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



router.get('/delete-question-answer/:id', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {


        QuestionAnswer.findOne({ where: { id: req.params.id } })
            .then(question_answer => {

                QuestionAnswer.destroy({
                    where: {
                        id: question_answer.id
                    }

                })

                    .then(qanswer => {


                        Title.findAll()
                            .then(title1 => {
                                NavItems.findAll()
                                    .then(navitems => {
                                        Question_Category.findOne({ where: { id: question_answer.questionCategoryId } })
                                            .then(question_category => {


                                                QuestionAnswer.findAll({ where: { questionCategoryId: question_category.id } })
                                                    .then(question_answer => {


                                                        res.render('admin/view-question-answer', {
                                                            layout: 'admin-layout',
                                                            name: req.session.name,
                                                            email: req.session.email,
                                                            id: req.session.userid,
                                                            //role: req.session.role,
                                                            title1,
                                                            question_answer,
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