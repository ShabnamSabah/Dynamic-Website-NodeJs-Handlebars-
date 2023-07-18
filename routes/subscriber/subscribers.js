const express = require('express');

const Subscriber = require('../../model/Subscriber');
const router = express.Router();


router.post('/subscribe', async (req, res) => {



    let { email } = req.body;
    //const hash = await bcrypt.hash(password,10);


        const newSubscriber= new Subscriber({
             email
          

        });
        newSubscriber.save()
            .then(new_subscriber => {
               // req.flash('success_msg', 'Succesfully Added');
                res.redirect('/');

            })
            .catch(err => console.log(err));




})

module.exports = router;