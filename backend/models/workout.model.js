const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  username: {type: String, required: true},
  date: {type: Date, required: true},
  muscleGroups: {type: Object, required: true},
  exercises: {type: Object, required: true}
}, {timestamps: true});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
