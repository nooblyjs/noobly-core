const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const clientId = '196107387559-tukm98v56a69e737n50igf35fv3d3hjd.apps.googleusercontent.com';
const secret = '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';
const callback= 'http://localhost:8080/callback';


function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
    };
}

passport.use(new googleStrategy({
    clientID: clientId,
    clientSecret: secret,
    callbackURL: callback,
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
        //console.log(accessToken);
        cb(null, extractProfile(profile));
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});