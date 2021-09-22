const router = require('express').Router();
const moment = require('moment');
let Workout = require('../models/workout.model');

router.get('/', (req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', (req, res) => {
  const username = req.body.username;
  const date = moment(req.body.date) || moment();
  const exercises = req.body.exercises;
  const newWorkout = new Workout({
    username,
    date,
    exercises
  }).save().then(() => res.json('Workout added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:username', (req, res) => {
  Workout.find({username: req.params.username})
    .then(w => res.json(w))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Workout.findById(req.params.id)
    .then(w => {
      if (req.body.username) w.username = req.body.username;
      if (req.body.date) w.date = Date.parse(req.body.date);
      if (req.body.musclegroups) w.musclegroups = req.body.musclegroups;
      if (req.body.exercises) w.exercises = req.body.exercises;

      w.save()
        .then(() => res.json('Workout updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
