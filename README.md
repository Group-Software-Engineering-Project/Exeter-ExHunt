# Exeter-ExHunter-master
 
# Exhunt - Treasure Hunt Game
<img src ="https://www.publicengagement.ac.uk/sites/default/files/styles/content_width/public/job/exetelogo.jpg?itok=XYnsCi8q" height = "200"/>

Logo by [Exeter University](https://www.exeter.ac.uk/)

--- 

Exhunt is a fun, open source webapp accessible to all, aimed at University Newcomers, to help them get familiar with the Streatham campus of Exeter University.

When logging in, these freshers will be referred to as "Hunters", and will face several challenges consisting in Computer Science based questions. On the other hand, "Creators" produce a series of challenges called a "Track" when combined, for the Hunters to follow.

Welcome to the official repository!

This project was created by a team of 2nd year Computer Science Students.

For frequent updates on Exhunt you can follow [LucasMartinCalderon](https://github.com/LucasMartinCalderon) and watch this repository!

**Key Points** :
 - **Web-Based** : It is a web solution without required installation.
- **Open Source** : It is totally open source and free for all.
- **Platforms** : It works on mobile and desktop.
- **AR** : It makes use of Location based AR.


# Augmented Reality (AR)

As mentioned, Augmented Reality is being implemented based on location.

Libraries making this possible include **AR.js** as well as **GeoAR.js**.

# Using AR in Exhunt

To make the most of all functionalities the following permissions are required : 
- **Authorize Location Services** : To determine your location relative to the AR coordinates.
- **Allow Camera Access** : To be able to visualize the AR component(s).

To enable these features, turning on the **Location Services** on your device, and accepting **Geolocation** and the **Camera** prompt in your browser will be necessary for the optimal AR experience. 

*Make sure these elements are not disabled in your phone's security settings otherwise it will not work.*


# What "Location Based" means

Check out the Location Based documentation [here](https://github.com/jeromeetienne/AR.js/blob/master/aframe/README.md#location-based).

**AR.js** comes with **aframe** implementation, which has several custom components that permit data integration from GPS sensors. This means it is possible to add **gps-entity-place** and/or custom **aframe** entities possessing particular longitude/latitude values.

We invoked them via script and loaded them from **HTML5 geolocation**. As soon as one or more **gps-entities** and **gps-camera** on the camera entity are added, your position and your distance to places are computed from the system.

The use of phone sensors for orientation/position, to show content for each location on your camera, is also managed by **AR.js**. Indeed, re-evaluation of orientation and position can be witnessed by tilting the camera. Finally, smaller content reveals  further away places whereas bigger one does the opposite.


# Routing (in Node.js / with Express.js)

Routing defines the way in which the client requests are handled by the application endpoints. 
**Routing with Express in Node** : Express.js has an “app” object corresponding to HTTP. We define the routes by using the methods of this**ap** object. This **app** object specifies a callback function, which is called when a request is received. We have different methods in app object for a different type of request:

- **GET request use app.post() method** :

`const express = require('express');
const resourcePageRouter = express.Router();
resourcePageRouter.get('/', function(req, res, next) {
 res.render('resourcesPage', { title: 'Resources'});
});`

- **POST request use app.get() method** :

`var express = require('express');
var router = express.Router();
var passport = require('passport');
router.post("/creator", passport.authenticate("local", {
  successRedirect: "/creator",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));`

- **Route without framework** :

`User.findOne({ "username": username}, 
    (err, user) => {
      if (err || !user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist"
        });
        return;
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          const address = (user.role == "Hunter") ? "/hunters" : "/creator"
          res.redirect(address);
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
        }
      }
  });`

In our app, we have used routing across each individual page in order to navigate through it smoothly and easily. This is mainly noticeable when clicking on the multiple implemented buttons. 

So, to perform routing with the Express.js you have only to load the express and then use the app object to handle the callbacks according to the requirement.


# Data and Database

MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database. The data objects are stored as separate documents inside a collection — instead of storing the data into the columns and rows of a traditional relational database. The motivation of the MongoDB language is to implement a data store that provides high performance, high availability, and automatic scaling. It is also an open source database management system (DBMS) that uses a document-oriented database model which supports various forms of data. A record in MongoDB is a document, which is a data structure composed of field and value pairs.

In our app, we use MongoDB to store all the information concerning the created tracks, videos, Hunters, Creators, and so on. We have therefore linked our database to our app in order to fetch all the relevant data when needed.

`mongoose.connect("mongodb://localhost/exhunt");`


# Style

A website is often divided into multiple sections, which can be styled in however way wanted, with whatever styling properties wished for. Cascading Style Sheet (CSS) and JavaScript are the most popular ways to achieve this.

In our App, along with importing relevant images, we have created our own CSS and JavaScript files, which have been applied wherenever required.

In CSS, each element from each page is referred to from the files containing the webpage content and specifies its layout through a *class* or *id* tag :

- The **header** is usually located at the top of the website and can contain a logo or the website name:
`<link rel="stylesheet" type="text/css" href="/stylesheets/leaderboard_style.css">
        <link rel="stylesheet" href="stylesheets/dots_background.css"/>`

- The **footer** is placed at the bottom of the page and usually contains information :
`.footerArea{
    background-color: rgb(228, 228, 228);
    max-width: fit-content;
    margin: 0 auto;
    padding: 0.3%;
    font-family:'Montserrat',sans-serif;
    border-radius: 5px;
    margin-top: 2%;
}`

- The **body** is the content of a website as it composes and fills most of it :
`.content {
  background-color:rgba(255,255,255,.8);
  border-radius:.25em;
  box-shadow:0 0 .25em rgba(0,0,0,.25);
  box-sizing:border-box;
  left:50%;
  padding:10vmin;
  position:fixed;
  text-align:center;
  top:50%;
  transform:translate(-50%, -50%);
}`

- **Buttons** are essential to our app and also need to be styled :
`    .button {
        background-color: #6495ed;
        padding-top:1.5%;
        padding-bottom:1.5%;
        cursor: pointer;
        text-decoration: none;
        width: 47.9%;
        color: azure;
        float: left;
        margin: 1%;
        font-family:'Montserrat',sans-serif;`

- The **background** is also essential to improving website aesthetics. In our case, we decided to create our own :
`canvas {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:-1;
 }`
`html,body{
  margin: 0;
  padding: 0;
 }`


In JavaScript, a **script** containing one or multiple functions will have been written, applied to a particular element within the webpage as well as programming its behavior. For example, to create our background part of the script ressmbles:

`var circles = [],
    canvas = document.getElementById("canvas1"),
    context = canvas.getContext("2d"),
    opacity = 0.6,
    colors = ['rgba(34, 49, 63,' + opacity + ')', 
              'rgba(189, 195, 199,' + opacity + ')',
              'rgba(241, 196, 15,' + opacity + ')',
              'rgba(231, 76, 60,' + opacity + ')',
              'rgba(231, 76, 60,' + opacity + ')'
             ],
    minSize = 1,
    maxSize = 10,
    numCircles = 300,
    minSpeed = -2,
    recommended: -maxspeed
    maxSpeed = 2,
    expandState = true;`

`function buildArray() {
    'use strict';`
    
    `for (var i =0; i < numCircles ; i++){
        var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
            left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
            top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
            size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
            leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            expandState = expandState;
           
            while(leftSpeed == 0 || topSpeed == 0){
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
            }
        var circle = {color:color, left:left, top:top, size:size, leftSpeed:leftSpeed, topSpeed:topSpeed, expandState:expandState };
        circles.push(circle);
    }}


# Embedded JavaScript (EJS)

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. To begin, content, delivered as JavaScript, has to be sent to the browser. Once loaded, the JavaScript template engine will take over and generate the HTML client side.
Having syntax similar to HTML, there are, however differences, such as:
- **Tags** : use *<% include JavaScript.js %>* to refer to JavaScript files
- Faster compilation and rendering
- Both server JS and browser support
- Compliance with the Express view system

In our app, we use the EJS files to display all of the content, rendered as HTML, but with the ability to make use of included external JavaScript files, allowing a certain behaviour to occur:
`<% if (typeof(errorMessage) !== "undefined") { %>
  <div class="error-message"><%= errorMessage %></div>
<% } %>
<% include ../partials/header.ejs  %>
<% include ../partials/LeaderboardButton.ejs %>
<% include ../partials/resourcesPageButton.ejs %>`

# A Track Creator User Manual

As a creator, you have two choices when you sign in.

- View Your Current Tracks
- Create a new Track

**Create your first Track**

Lets go through making your first track. When selecting the track creation option, you will be directed to a track setup screen. Here, you will input your new track's name, the number of challenges it will have, an Track Introduction Video (A Video to introduce the user to your track), and a video where you will tell the user the first hint to find your first location.

You will then be allowed to flesh out each of your challenges. This includes giving a Welcome Video for the challenge location (A Video to welcome and congratulate the user on finding the location. You could also include a couple of facts about the building/location they are at.), the hint to the next location, and the coordinates of this current challenge location. An easy way of getting these, are to use google maps, and simply clicking on the place where your location is, giving you the location's latitude and longitude coordinates. Don't worry on it being too accurate, the user only has to be within 150 metres to proceed to the next challenge!

Your final challenge will also be a little different. Instead of uploading a video giving the user a clue of the next location, you should include an outro video (A video to conclude your track). The rest of the challenge upload will be the same, however.

And you're done! If you follow these steps, you'll be able to make your own track for the Hunters to play.


**View Tracks**

If you wanted to take a look at all of the tracks you've made, head over to the Track Viewer through the starting page when you login as a creator. Here you'll be able to see all the tracks you've created, as well as some statistics, which include the average rating that your track has been given, and the number of times users have played them.

Don't like the layout of a track? Getting bad ratings? Or is it simply just out of date? No worries! Just press the delete button, and the track, challenges and videos will be deleted from the app.


# How to install the application

Before attempting to run this application, make sure to install the latest version of node.js and the node package manager(npm) is up to date. If you have problems running the application, try installing earlier versions of node or npm.

To start, download the files from github and put them into a suitable folder location. Due to the complex nature of the application, it uses multiple packages such as `passport` `express.js` `mongoDB` `mongoose` etc.

To install these applications packages, you need to use the command `npm install` or `npm i` by running it in the command line, in the same directory as the git files you downloaded. To get to the files use the `cd` command, followed by the path to the folder.

These packages are essential libraries to run the application. Without them, the code doesn't have access to these and therefore will produce errors when you try to run it. 



# How to fund the application

Before being able to start the application, certain packages within it may need funding. This may be done with the « npm fund » command.
Retrieving information on how to fund the dependencies of a given project is put into effect. If no package name is provided, all dependencies that are looking for funding will be displayed in a tree-structure in which are listed the type of funding and the url to visit. If a package name is provided then it tries to open its funding url using the **--browser** config param.






# How to start the application

Once installed, you now need to start the application. To do this, thanks to the "www" file in the "bin" folder, simply use the command `npm start`. This runs an arbitrary command specified in the package’s "start" property of its "scripts" object. 

When the "start" property is specified on the "scripts" object, it will run node ./bin/www, as it is the same as typing 
“node ./bin/www”.

“npm start” looks up your “scripts” inside the file and looks for “start”, subsequently running what is inside of the “start”.




# Libraries

- **bcryptjs** : Password Hashing Library (Salting)
- **connect-mongo** : Create a connection to MongoDB instance.
- **ejs** : Simple templating language allowing HTML markup generation with JavaScript.
- **express** : Node js web application server framework for building single-page, multi-page, and hybrid web applications (standard server framework for node. js).
- **gridfs-stream** : Constructor export accepting open mongodb-native db/mongodb-native driver being used
- **mongoose** : Object Data Modeling library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- **nodemailer** : Module for Node. js applications allowing easy email sending 
- **passport** : Authentication middleware for Node. js.


# Folders

- **bin** : Login
- **emails**	: Sign Up Emails
- **models**	: Mongoose linked Javascript Files
- **public**	: Styling
- **routes**	: JavaScript Files
- **views**	: EJS files
- **app.js** : Route Set Up
- **package-lock.json** : Parameters SetUp
- **package.json** : Parameters SetUp
- **questions.json** : Question Pool


# What's next?

These are some ideas that could be implemented in the near future in order to improve our App:
- **Subtitle Inclusion**
- **Location and Duration Expansion**
- **Adaptation for other ends**
- **Map Selection for Track Creation**


# Privacy Notice

By signing up to this app, you accept your email and name to be shared.


# Licenses

- **MIT Open License**
- **Propietary**

