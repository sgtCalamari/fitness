const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setSchema = new Schema({
  reps: Number,
  weight: Number,
  duration: Number
}, {timestamps: true});

const exerciseSchema = new Schema({
  name: {type: String, required: true},
  musclegroups: {type: [String], required: true},
  sets: {type: [setSchema], required: true}
}, {timestamps: true});

const workoutSchema = new Schema({
  username: {type: String, required: true},
  date: {type: Date, required: true},
  location: {type: String, required: false},
  exercises: {type: [exerciseSchema], required: true}
}, {timestamps: true});

const Set = mongoose.model('Set', workoutSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
