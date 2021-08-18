const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy } = require('passport-jwt')

const User = require('../models/userModels')
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Not user found.' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
}));

passport.use(new Strategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user); id
    });

})