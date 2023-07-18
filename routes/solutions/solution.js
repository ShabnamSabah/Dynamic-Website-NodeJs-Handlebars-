
const express = require('express');
const Title = require('../../model/Title');
const SubNavItem4_6 = require('../../model/SubNavItem3_6');
const NavItems = require('../../model/NavItems');


const Solution_Category = require('../../model/Solution_Category');
const Solution_Details = require('../../model/Solution_Details');
const router = express.Router();


router.get('/category/:name', async (req, res) => {

    let name = req.params.name;
    console.log(name)


    Solution_Category.findAll({

        where: { stype: name },
        include: [{
            model: Solution_Details,
            required: true
        }]

    })
        .then(s_details => {

            //console.log(s_details);
           // console.log(JSON.stringify(s_details, null, 2));
            // res.render('admin/solution_category', {
            //     layout: false,
            //     titles,
            //     name: name,
            //     s_details
            // });

            NavItems.findAll()
                .then(nitem => {
                    SubNavItem4_6.findAll()
                        .then(subnavitem4_6 => {

                            console.log(JSON.stringify(s_details, null, 2));
                            res.render('solutions/solution_category', {
                                layout: 'page-layout',

                                nitem,
                                subnavitem4_6,
                                s_details
                            });
                        })




                })

        })









});




router.get('/category/services/:name', async (req, res) => {

    Solution_Details.findOne({

        where: { title: req.params.name },
        include: [{
            model: Solution_Category,
            required: true
        }]

    }).then(service_details => {
        //console.log(JSON.stringify(service_details, null, 2));
        NavItems.findAll()
            .then(nitem => {

                SubNavItem4_6.findAll()
                    .then(subnavitem4_6 => {
                        res.render('solutions/service_details', {
                            layout: 'page-layout',

                            nitem,
                            subnavitem4_6,
                            service_details
                        });

                    })



            })
    })

})


router.get('/all-category', async (req, res) => {

    Solution_Category.findAll({
        include: [{
            model: Solution_Details,
            required: true
        }]
    })
    
      .then(s_details=>{
       // console.log(JSON.stringify(s_details, null, 2));
       NavItems.findAll()
                .then(nitem => {
                    SubNavItem4_6.findAll()
                        .then(subnavitem4_6 => {

                            console.log(JSON.stringify(s_details, null, 2));
                            res.render('solutions/category_list', {
                                layout: 'page-layout',

                                nitem,
                                subnavitem4_6,
                                s_details,
                                title: 'Solutions By Technonolgy'
                            });
                        })




                })
      })

})
module.exports = router