import React from 'react';
import moment from 'moment';
import CreateExercise from './CreateExercise';
import WorkoutList from './WorkoutList';

class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleExercisesChange = this.handleExercisesChange.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSubmitWorkout = this.handleSubmitWorkout.bind(this);
    this.state = {
      date: moment(),
      location: '',
      exercises: [],
      workouts: []
    };
  }

  handleSubmitWorkout() {
    // validate state workout values
    const date = this.state.date;
    const location = this.state.location ?? '';
    const exercises = this.state.exercises;
    if (!date) return alert('please enter a valid date');
    if (exercises.length === 0) return alert('please enter at least one exercise');
    // configure new workout
    const newWorkout = { username: 'joe', date, location, exercises };
    // submit workout to db
    this.setState((state) => ({
      workouts: [...state.workouts, newWorkout],
      exercises: []
    }));
  }

  handleDateChange(e) {
    this.setState({date: moment(e.target.value)});
  }

  handleChangeLocation(e) {
    this.setState({location: e.target.value});
  }

  handleExercisesChange(exercises) {
    this.setState({exercises: exercises});
  }

  render() {
    const date = this.state.date; // yyyy-MM-DD for dateValue
    const dateValue = moment(date).format('yyyy-MM-DD');
    const workouts = this.state.workouts ?? [];
    const exercises = this.state.exercises ?? [];
    return (
      <div>
        <h2>Log Workout</h2>
        <div>
          <div>
            <label className='form-label'>Name</label>
            <input type='date' className='form-control' id='workoutDate' value={dateValue} onChange={this.handleDateChange} />
          </div>
          <div>
            <label className='form-label'>Location</label>
            <input type='text' className='form-control' id='workoutLocation' onChange={this.handleChangeLocation} />
          </div>
          <CreateExercise onExercisesChange={this.handleExercisesChange} exercises={exercises} />
          <div className='d-grid mt-2'>
            <button
              type='button'
              className='btn btn-primary btn-sm btn-fill'
              onClick={this.handleSubmitWorkout}>+ Add Workout</button>
          </div>
        </div>
        {workouts.length > 0 && <WorkoutList workouts={workouts} />}
      </div>
    );
  }
}

export default CreateWorkout;
