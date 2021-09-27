const passport = require('passport');
const router = require('express').Router();
let MuscleGroup = require('../models/muscleGroup.model');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  MuscleGroup.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const name = req.body.muscleGroup;
  const newMuscleGroup = new MuscleGroup({name});
  newMuscleGroup.save()
    .then(() => res.json('Muscle Group added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
