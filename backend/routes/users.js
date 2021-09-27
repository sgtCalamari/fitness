const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user.model');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
