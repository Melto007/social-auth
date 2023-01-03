import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import User from '../model/user.js'

var GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser(function(user, next) {
    next(null, user.id)
});
  
passport.deserializeUser(function(id, next) {
    User.findById(id, function(err, user) {
        next(err, user)
    })
});

passport.use(new GoogleStrategy(
    {
        clientID: '373310772397-ql8rqupo2nnoo9tg6ongjnmhpsqe1r3n.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:4000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, next) => {
        console.log("MY PROFILE", profile._json.email)
        User.findOne({ email: profile._json.email }).then((user) => {
            if(user) {
                console.log("User already exists", user)
                next(null, user)
            } else {
                User.create({
                    name: profile.displayName,
                    googleId: profile.id,
                    email: profile._json.email
                })
                .then((user) => {
                    console.log("User is create successfully", user)
                    next(null, user)
                })
                .catch((err) => console.log(err))
            }
        })
    }
))

export default passport