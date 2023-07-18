const path = require('path')
const express = require('express');
var hbs = require('express-handlebars');
var _handlebars = require('handlebars')
const  bodyParser = require('body-parser');
const flash = require('connect-flash');
var session = require('express-session');
const User = require('./model/User');
const bcrypt = require('bcryptjs');


//Import Route
const home = require('./routes/home/home');
const auth = require('./routes/auth/auth');
const admin = require('./routes/admin/admin');
const title = require('./routes/admin/title');
const navbar = require('./routes/admin/navbar');
const navitem1 = require('./routes/admin/navitem1');
const navitem2 = require('./routes/admin/navitem2');
const navitem3 = require('./routes/admin/navitem3');
const navitem4 = require('./routes/admin/navitem4');
const navitem5 = require('./routes/admin/navitem5');
const subnavitem1_6 = require('./routes/admin/subnavitem1_6');
const subnavitem2_6 = require('./routes/admin/subnavitem2_6');
const subnavitem3_6 = require('./routes/admin/subnavitem3_6');

const whitepaper = require('./routes/whitepaper/whitepaper');
const feedback = require('./routes/feedback/feedback');
const subscriber = require('./routes/subscriber/subscribers');
const solution = require('./routes/solutions/solution');

// Database
const db = require('./config/database');
//const auth = require('./middleware/auth');
const { allowedNodeEnvironmentFlags } = require('process');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

  //Model Synchrization With Database
  //db.sync({alter:{drop: false}})
  db.sync()
   .then((result) => {
       //console.log(result);
       User.findOne({
        where: {id: 1}
       })
       .then(user=>{
          if(!user){
            const newUser = new User({

              name: 'admin',
              email: 'admin@gmail.com',
              password: '12345'
      
            })
      
                //Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hash
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                //req.flash('success_msg', 'You Are Registered Succesfully');
                                //res.redirect('/auth/login');
                              console.log('Admin Created')
                            })
                            .catch(err => console.log(err));
      
                    }))

          }else{
            console.log('Admin Already Added')
          }

       })
       
   })
   .catch((err) => {
       console.log(err);
   })

const app = express();


//Handlebars
// const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


// view engine setup with hbs
app.engine('hbs', hbs({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir:path.join(__dirname, 'views/partials'),
  handlebars: allowInsecurePrototypeAccess(_handlebars),
  helpers:{
    'calculation': function(v1, v2,options){
      if(v1 === v2){
        return options.fn(this);
      }
      else{
        return options.inverse(this);
      }
    }

   }
 
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// application level middleware
// app.use(auth);

app.use(express.json());
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))


// Session
app.use(session({
  secret: "xyz888",
  resave: true,
  saveUninitialized: true
}));




//Flash Message Initialization
 app.use(flash());
 
  // Global variables
  app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
 });

app.use('/', home);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/admin', title);
app.use('/admin', navbar);
app.use('/admin', navitem1);
app.use('/admin', navitem2);
app.use('/admin', navitem3);
app.use('/admin', navitem4);
app.use('/admin', navitem5);
app.use('/admin', subnavitem1_6);
app.use('/admin', subnavitem2_6);
app.use('/admin', subnavitem3_6);

app.use('/whitepaper',whitepaper),
app.use('/', feedback);
app.use('/', subscriber);
app.use('/solutions', solution);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));