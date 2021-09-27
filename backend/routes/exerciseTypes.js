const passport = require('passport');
const router = require('express').Router();
const ExerciseType = require('../models/exerciseType.model');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  ExerciseType.find()
    .then(et => res.json(et))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const name = req.body.name;
  const musclegroups = req.body.musclegroups;
  const newExerciseType = new ExerciseType({name, musclegroups});
  newExerciseType.save()
    .then(() => res.json('Exercise Type added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
