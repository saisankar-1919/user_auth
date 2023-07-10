const express = require("express");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7996;
const authenticationRoute = require('./src/routes/auth')

app.use(express.json()); // Example middleware for JSON parsing

app.use('/api', authenticationRoute)

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