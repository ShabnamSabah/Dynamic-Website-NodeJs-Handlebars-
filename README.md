# Dynamic Website With NodeJs & Handlebars

It is a dynamic website.
Features:
1. An admin can set and edit the Title of the website dynamically.
2. An admin can set and edit the navitems dynamically.
3. An admin can set and edit the contents of each navitem section dynamically
4. An admin account is previously defined.
5. Session-based authorization technique is used for admin authentcation
6. Users can see the content of the website only.
   

## Technology Used
1. Node.JS
2. MySQL (Sequelize)

    ##### 
    Sequelize is a Node. js-based Object Relational Mapper  that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. An Object Relational Mapper performs functions like handling database records by representing the data as objects. The benefit of using Sequelize is we can easily avoid writing raw SQL queries.


3. Javascript
4. Express.JS
5. Handlebars for Client Side User-Interface
## Documentation

1. Initialize the project by running the following command in Visual Studio Code.
```
npm init
```

2. Install the dependencies by running the following command in Visual Studio Code.
```
npm install
```
3. Create the databse with g a name in Xampp Server/ MySQl Workbench
```
your database name
```

4. Create .env file in the project folder and add the following
```
DB_name = "your database name"
DB_user = "usernme of datatabse"
DB_password = 'database password'
JWT_SECRET = secret key for user authentication
```

5. Run the project by using the following command.
```
nodemon app.js
```
After that databse will be created with admin account..

6. Open your browser and the following command
```
localhost:8000
```
7. Login As Admin with the following email and password
   
```
username: admin
email: admin@gmail.com
password: 12345

```
(This is not for any user, users can see the content of the website only.)

8. Go to the Dashboard page

9. Admin can set the title and navitems of navitem.

    Here I have set six Navitems and 3 dropdowns for last Navitem in this website.

    My NavItems are set in the following way. So, test it according to this way.

 ```
  1.Introdruction
  2.Solution
  3.Whitepaper
  4.Roadmap
  5. Team
  6. More
      1.About Us 
          1. Mission 
          2. Vision
          3. Objective
          4. Why we make our website
     2. FAQ
     3. Contact
```

As this a dynamic website, that's why while making the website, I fixed the navitems previously in the above mentioned serial number and designed the content section in accordingly.
The images are static as off now, based on the request we can make dynamic images.

10. After adding the contents, inthe admin can view the changes in the home page
11. There is admin profile too, to view this click on the person icon from the top right corner of dashboard
12. After that admin can logout from the system.

   
