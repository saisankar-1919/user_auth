const express = require("express");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7996;
const authenticationRoute = require('./src/routes/auth')
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./src/helpers/passport');

app.use(express.json()); // Example middleware for JSON parsing

app.use('/api', authenticationRoute)

app.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// Error handling middleware
app.use((err, req, res, next) => {
    // Handle errors
  });

//Start the server
app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Server is running in " + port );
    }
})