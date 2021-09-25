const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'keys', 'privkey.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

genHash = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
}

module.exports.isValidPassword = (password, hash, salt) => {
  var hashVerify = genHash(password, salt);
  return hash === hashVerify;
};

module.exports.genPassword = (password) => {
  var salt = crypto.randomBytes(32).toString('hex');
  var hash = genHash(password, salt);

  return { salt, hash };
};

module.exports.issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = '1d';
  const issuedAt =  Date.now();
  const payload = {
    sub: _id,
    iat: issuedAt
  };

  const algorithm = 'RS256';
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  };
};
