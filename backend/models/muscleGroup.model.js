const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muscleGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { timestamps: true })

const MuscleGroup = mongoose.model('MuscleGroup', muscleGroupSchema);

module.exports = MuscleGroup;
