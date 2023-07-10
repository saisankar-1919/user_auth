const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"1051346607970-6dttkfmghetleqtnvjtnagh1savjvg4r.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:7996",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));