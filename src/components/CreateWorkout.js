import React from 'react';
import CreateExercise from './CreateExercise'

class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleExercisesChange = this.handleExercisesChange.bind(this);
    this.state = {
      date: new Date(),
      exercises: []
    };
  }

  handleDateChange(e) {
    this.setState({date: new Date(e.target.value)});
  }

  handleExercisesChange(exercises) {
    this.setState({exercises: exercises});
  }

  render() {
    const dateValue = this.state.date.toISOString?.().split('T')[0];
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
            <input type='text' className='form-control' id='workoutLocation' />
          </div>
          <CreateExercise onExercisesChange={this.handleExercisesChange} exercises={exercises} />
          <div className='d-grid mt-2'>
            <button type='button' className='btn btn-primary btn-sm btn-fill'>+ Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateWorkout;
