
const express = require('express');
const Title = require('../../model/Title');
const Category = require('../../model/Category');
const Category_Details = require('../../model/Category_Details');
const NavItems = require('../../model/NavItems');
const SubNavItem4_6 = require('../../model/SubNavItem3_6');
const router = express.Router();


router.get('/category/:name', async (req, res) => {

    let name = req.params.name;
    console.log(name)

   

            Category.findAll({
                
            where: { wtype: name },
                include: [{
                    model: Category_Details,
                    required: true
                }]

            })
                .then(whitepaper_details => {

                    //console.log(s_details);
                    console.log(JSON.stringify(whitepaper_details, null, 2));
                    NavItems.findAll()
                    .then(nitem=>{

                         SubNavItem4_6.findAll()
                         .then(subnavitem4_6=>{

                            res.render('whitepaper/whitepaper_category', {
                                layout: 'page-layout',
                             
                                nitem,
                                subnavitem4_6,
                                whitepaper_details
                            });
        
                         })
                       

                    })
                  



                })

   

});


router.get('/all-category', async (req, res) => {

    

            Category.findAll({
                
         
                include: [{
                    model: Category_Details,
                    required: true
                }]

            })
                .then(whitepaper_details => {

                    //console.log(s_details);
                    console.log(JSON.stringify(whitepaper_details, null, 2));
                    NavItems.findAll()
                    .then(nitem=>{

                         SubNavItem4_6.findAll()
                         .then(subnavitem4_6=>{

                            res.render('whitepaper/whitepaper_categories', {
                                layout: 'page-layout',
                            
                                nitem,
                                subnavitem4_6,
                                whitepaper_details,
                                title: 'Categories of Whitepaper'
                            });
        
                         })
                       

                    })
                  



                })

      
});

module.exports = router