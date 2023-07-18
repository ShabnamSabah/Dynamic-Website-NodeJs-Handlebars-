const express = require('express');
const Feedback = require('../../model/Feedback');
const router = express.Router();


router.post('/feedback', async (req, res) => {



    let { name, email, message } = req.body;
    //const hash = await bcrypt.hash(password,10);


        const newFeedback = new Feedback({
            name, email, message
          

        });
        newFeedback.save()
            .then(new_feedback => {
               // req.flash('success_msg', 'Succesfully Added');
                res.redirect('/');

            })
            .catch(err => console.log(err));




})

module.exports = router;