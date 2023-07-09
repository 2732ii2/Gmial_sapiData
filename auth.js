

const passport=require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const GOOGLE_CLIENT_ID =
  "854039148254-ri2pn38hovl7q4tubke0ee1ippn6i8ls.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7600/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {


        return done(null, profile);
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    //   });
    }
  )
);

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
});