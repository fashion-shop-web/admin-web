const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const loginService = require('../services/LoginService');

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async (email, password, done) => {
        const user = await loginService.findByEmail(email);
        if (!user || !loginService.validatePassword(password, user)) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;



