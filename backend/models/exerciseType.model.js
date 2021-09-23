const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  musclegroups: {
    type: [String],
    required: true
  }
}, { timestamps: true })

const ExerciseType = mongoose.model('ExerciseType', exerciseTypeSchema);

module.exports = ExerciseType;
