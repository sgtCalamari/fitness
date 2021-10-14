import React from 'react';
import {withRouter} from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import moment from 'moment';
import axios from 'axios';
import CreateExercise from '../exercises/CreateExercise';
import WorkoutList from './WorkoutList';
import confetti from 'canvas-confetti';

class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleExercisesChange = this.handleExercisesChange.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeLocationText = this.handleChangeLocationText.bind(this);
    this.handleSubmitWorkout = this.handleSubmitWorkout.bind(this);
    this.handleAddLocationInput = this.handleAddLocationInput.bind(this);
    this.state = {
      isEdit: false,
      titleText: 'Log Workout',
      date: moment(),
      location: '',
      useGeolocation: false,
      locationComponent: <input
        type='text'
        className='form-control'
        id='workoutLocation'
        onChange={this.handleChangeLocationText}
        placeholder="Enter workout location (optional)"
      />,
      exercises: [],
      workouts: []
    };
  }

  componentDidMount() {
    this.applyAuthorizationHeader();
    this.handleUnsavedExercises();
    this.checkForEdit();
  }

  componentWillUnmount() {
    const isEdit = this.state.isEdit;
    if (isEdit) return;

    const exercises = this.state.exercises;
    if (exercises && exercises.length > 0) {
      console.log('setting unsaved exercises to local storage');
      localStorage.setItem('unsavedExercises', JSON.stringify(exercises));
    }
  }

  render() {
    const titleText = this.state.titleText;
    const date = this.state.date; // yyyy-MM-DD for dateValue
    const dateValue = moment(date).format('yyyy-MM-DD');
    const workouts = this.state.workouts ?? [];
    const exercises = this.state.exercises ?? [];
    const isGeolocation = this.state.useGeolocation;
    const locationComponent = this.state.locationComponent;
    const geolocationButtonText = `${(isGeolocation ? '- Remove' : '+ Add')} Geolocation`;
    return (
      <div>
        <div>
          <h1>{titleText}</h1>
          <div className='card'>
            <div className='card-body'>
              <div className='mb-2'>
                <label className='form-label'>Workout Date:</label>
                <input
                  type='date'
                  className='form-control'
                  id='workoutDate'
                  value={dateValue}
                  onChange={this.handleDateChange}
                />
              </div>
              <div className='mb-2'>
                <label className='form-label'>Location:</label>
                <button
                  id='addLocationButton'
                  className='btn btn-sm btn-outline-primary ms-1'
                  onClick={this.handleAddLocationInput}
                >
                  {geolocationButtonText}
                </button>
                {locationComponent}
              </div>
            </div>
          </div>
          <CreateExercise
            onExercisesChange={this.handleExercisesChange}
            exercises={exercises}
          />
          <div className='d-grid mt-2'>
            <button
              type='button'
              className='btn btn-success btn-sm btn-fill'
              onClick={this.handleSubmitWorkout}>Finish Workout! 🎉</button>
          </div>
        </div>
        {workouts.length > 0 &&
          <div className='mt-1'><WorkoutList workouts={workouts} /></div>}
      </div>
    );
  }

  applyAuthorizationHeader() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
  }

  handleUnsavedExercises() {
    const isEdit = this.props.editWorkout ??
      this.props.match?.params?.id ??
      false;
    if (isEdit) return;
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

  handleSubmitWorkout() {
    const isEdit = this.state.isEdit;
    if (isEdit) {
      this.modifyWorkout();
    } else {
      this.addNewWorkout();
    }
  }

  addNewWorkout() {
    // validate state workout values
    const username = localStorage.getItem('username');
    const date = this.state.date;
    const location = this.state.location ?? '';
    const locationData = this.state.locationData;
    const exercises = this.state.exercises;
    if (!date) return alert('Please enter a valid date');
    if (exercises.length===0)return alert('Please enter at least one exercise');
    // configure new workout
    const newWorkout = { username, date, location, locationData, exercises };
    // submit workout to db
    const authToken = JSON.parse(localStorage.getItem('auth')).token;
    const config = {headers: {Authorization: authToken}};
    const url = `${process.env.REACT_APP_API_URL}api/workouts/add`;
    axios.post(url, newWorkout, config)
      .then(result => {
        newWorkout._id = result.data._id;
        this.props.onWorkoutSubmit()
      });
    this.setState((state) => ({
      workouts: [...state.workouts, newWorkout],
      exercises: []
    }));
    confetti({
      particleCount: 500,
      spread: 70,
      startVelocity: 65,
      origin: {
        y: 1
      }
    });
  }

  modifyWorkout() {
    // get existing workout id
    const id = this.props.match?.params?.id;
    // create update data
    const username = localStorage.getItem('username');
    const date = this.state.date;
    const location = this.state.location;
    const locationData = this.state.locationData;
    const exercises = this.state.exercises ?? [];
    if (!date) return alert('Please enter a valid date');
    const update = { username, date, location, locationData, exercises };
    // submit change to db
    const url = `${process.env.REACT_APP_API_URL}api/workouts/update/${id}`;
    axios.post(url, update)
      .then(result => console.log(result))
      .catch(err => console.log(err));
    confetti({
      particleCount: 500,
      spread: 70,
      startVelocity: 65,
      origin: {
        y: 1
      }
    });
  }

  checkForEdit() {
    const id = this.props.match?.params?.id;
    if (id) {
      this.getWorkoutById(id);
      return;
    }
    const workout = this.props.editWorkout;
    if (workout) {
      this.setState((state) => ({
        titleText: 'Edit Workout',
        date: workout.date ?? state.date,
        location: workout.location ?? state.location,
        exercises: workout.exercises ?? state.exercises
      }));
    }
  }

  getWorkoutById(id) {
    const url = `${process.env.REACT_APP_API_URL}api/workouts/_${id}`;
    axios.get(url).then(result => this.setState({
      isEdit: true,
      editWorkout: result.data,
      titleText: 'Edit Workout',
      date: result.data.date,
      location: result.data.location,
      exercises: result.data.exercises}));
  }

  handleDateChange(e) {
    this.setState({date: moment(e.target.value)});
  }

  handleChangeLocation(e) {
    this.setState({
      location: e?.label,
      locationData: e?.value
    });
  }

  handleChangeLocationText(e) {
    this.setState({location: e.target.value});
  }

  handleExercisesChange(exercises) {
    this.setState({exercises: exercises});
  }

  handleAddLocationInput() {
    const nowUseGeolocation = !this.state.useGeolocation;
    if (nowUseGeolocation) {
      this.locationInputGeolocation();
    } else { this.locationInputSimple(); }
    this.setState((state) => ({useGeolocation: !state.useGeolocation}));
  }

  locationInputSimple() {
    this.setState({locationComponent: <input
      type='text'
      className='form-control'
      id='workoutLocation'
      onChange={this.handleChangeLocationText}
      placeholder="Enter workout location (optional)"
    />});
  }

  locationInputGeolocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(p => this.setState({
        locationComponent: <GooglePlacesAutocomplete
          className='form-control'
          id='workoutLocation'
          apiKey={process.env.REACT_APP_MAPS_APIKEY}
          selectProps={{
            onChange: this.handleChangeLocation
          }}
          autocompletionRequest={{
            location: {
              lat: p.coords.latitude,
              lng: p.coords.longitude
            },
            radius: 8000
          }}
        />}));
    }
  }
}

export default withRouter(CreateWorkout);
