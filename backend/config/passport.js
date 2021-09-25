const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');

const pathToKey = path.join(__dirname, '..', 'keys', 'pubkey.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload);

    User.findOne({_id: jwt_payload.sub}, (err, user) => {
      return err
        ? done(err, false)
        : done(null, user ?? false);
    });
  }));
};
