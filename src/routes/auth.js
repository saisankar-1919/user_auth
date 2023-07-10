const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");

const errorHandling = (e) => {
    try {
      let checkCustomError = JSON.parse(e.message);
  
      if (checkCustomError.custom_error) {
        e.message = checkCustomError.custom_error;
        return e;
      } else {
        if (process.env.ENVIRONMENT == "LIVE_TEST") e.message = "Something went Wrong.";
        return e;
      }
    } catch {
      if (process.env.ENVIRONMENT == "LIVE_TEST") e.message = "Something went Wrong.";
      return e;
    }
  };

router.use('/signin',
graphqlHTTP({
  schema: require("../controllers/authentication/schema"),
  rootValue: require("../controllers/authentication/resolver"),
  graphiql: true,
  customFormatErrorFn: errorHandling,
}))

router.use('/signup',
graphqlHTTP({
  schema: require("../controllers/authentication/schema"),
  rootValue: require("../controllers/authentication/resolver"),
  graphiql: true,
  customFormatErrorFn: errorHandling,
}))

module.exports = router;