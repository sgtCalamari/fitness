const utils = require('../lib/utils');
const router = require('express').Router();
const User = require('../models/user.model');

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  User.findOne({username})
    .then((user) => {
      if (!user) {
        return res.status(401).json({success:false, msg:'could not find user'});
      }

      const isValid = utils.isValidPassword(req.body.password, user.hash, user.salt);
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires
        });
      } else {
        res.status(401).json({success: false, msg: 'credentials invalid'});
      }
    })
    .catch(err => next(err));
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  User.findOne({username})
    .then(user => {
      if (user) {
        res.status(400).json({success: false, msg: 'username already exists'});
      }
    })
    .catch(err => res.status(400).json({success: false, msg: err}));

  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username,
    salt,
    hash
  });

  try {
    newUser.save()
      .then(user => res.json({success: true, user}));
  } catch(err) {
    res.json({success: false, msg: err});
  }
});

module.exports = router;
