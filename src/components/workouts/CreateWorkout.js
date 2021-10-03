import React from 'react';
import moment from 'moment';
import axios from 'axios';
import CreateExercise from '../exercises/CreateExercise';
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
    const username = localStorage.getItem('username');
    const date = this.state.date;
    const location = this.state.location ?? '';
    const exercises = this.state.exercises;
    if (!date) return alert('Please enter a valid date');
    if (exercises.length === 0) return alert('Please enter at least one exercise');
    // configure new workout
    const newWorkout = { username, date, location, exercises };
    // submit workout to db
    const authToken = JSON.parse(localStorage.getItem('auth')).token;
    const config = {headers: {Authorization: authToken}};
    axios.post(`${process.env.REACT_APP_API_URL}api/workouts/add`, newWorkout, config)
      .then(result => {
        newWorkout._id = result.data._id;
        this.props.onWorkoutSubmit()
      });
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

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
    const existing = localStorage.getItem('unsavedExercises');
    if (existing) {
      const message = "Found existing exercises that haven't been saved to a workout. Would you like to pick up where you left off?";
      const loadExisting = window.confirm(message);
      if (loadExisting) {
        this.setState({exercises: JSON.parse(existing)});
      } else {
        localStorage.removeItem('unsavedExercises');
      }
    }
  }

  componentWillUnmount() {
    const exercises = this.state.exercises;
    if (exercises && exercises.length > 0) {
      console.log('setting unsaved exercises to local storage');
      localStorage.setItem('unsavedExercises', JSON.stringify(exercises));
    }
  }

  render() {
    const date = this.state.date; // yyyy-MM-DD for dateValue
    const dateValue = moment(date).format('yyyy-MM-DD');
    const workouts = this.state.workouts ?? [];
    const exercises = this.state.exercises ?? [];
    return (
      <div>
        <div>
          <h2>Log Workout</h2>
          <div className='card'>
            <div className='card-body'>
              <div>
                <label className='form-label'>Date:</label>
                <input type='date' className='form-control' id='workoutDate' value={dateValue} onChange={this.handleDateChange} />
              </div>
              <div>
                <label className='form-label'>Location:</label>
                <input type='text' className='form-control' id='workoutLocation' onChange={this.handleChangeLocation} />
              </div>
            </div>
          </div>
          <CreateExercise onExercisesChange={this.handleExercisesChange} exercises={exercises} />
          <div className='d-grid mt-2'>
            <button
              type='button'
              className='btn btn-primary btn-sm btn-fill'
              onClick={this.handleSubmitWorkout}>+ Add Workout</button>
          </div>
        </div>
        {workouts.length > 0 &&
          <div className='mt-1'><WorkoutList workouts={workouts} /></div>}
      </div>
    );
  }
}

export default CreateWorkout;
