const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                console.log('Login Error:', err);
                return done(err, null);
            }
            if (!user) {
                console.log('No User Found');
                return done(null, false);
            }
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (!result) {
                        // no error, no user
                        return done(null, false);
                    } else {
                        // get our req.user
                        return done(null, user);
                    }
                })
                .catch((err) => console.log(err));
            });
        }
    )
);
