import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExerciseList from './ExerciseList';
import CreateSet from  '../sets/CreateSet';

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.state = {
      name: '',
      musclegroups: [],
      allmusclegroups: [],
      groupChoice: 'default',
      sets: [],
      exerciseTypes: []
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
    this.getMuscleGroups();
    this.getExerciseTypes();
  }

  render() {
    const exercises = this.props.exercises;
    const addedTypes = exercises?.map(e => e.name);
    const muscleGroups = this.state.musclegroups?.sort().join('/');
    const exerciseTypes = this.state.exerciseTypes
      ?.filter(et => !addedTypes.includes(et.name));
    const isCardio = muscleGroups.indexOf('cardio') !== -1;
    const formClass = 'row row-cols-lg-auto g-3 align-items-center';
    const buttonClass = 'btn btn-primary btn-sm';
    const selectValue = this.state.name || 'default';
    const sets = this.state.sets;
    return(
      <div className='card mt-2'>
        <h5 className='card-title mt-1 ms-1'>Add Exercises:</h5>
        <div className='card-body'>
          <div className={formClass}>
            <div className='col-12'>
              {this.formatMuscleGroupDropdown()}
              <select
                className='form-select'
                id='exerciseName'
                onChange={this.handleExerciseNameChange}
                value={selectValue}
                disabled={sets.length > 0}
              >
                <option disabled value='default'>-- select an option --</option>
                {this.formatExerciseTypeOptions(exerciseTypes)}
              </select>
            </div>
            <div className='col-12'>
              <input
                className='form-control'
                type='text'
                readOnly
                disabled
                value={muscleGroups}
              />
              {this.formatHelpText()}
            </div>
            {selectValue !== 'default' &&
              <CreateSet
                onSetsChange={this.handleSetsChange}
                isCardio={isCardio}
                sets={sets}
              />}
            <div className={buttonClass} onClick={this.handleClick}>
              + Add Exercise
            </div>
          </div>
        </div>
        {exercises.length > 0 &&
          <>
            <hr/>
            <ExerciseList className='card-body' exercises={exercises} />
          </>}
      </div>
    );
  }

  getExerciseTypes() {
    axios.get('https://fitness.joemart.in/api/exerciseTypes')
      .then(types => this.setState({ exerciseTypes: types.data }))
      .catch(err => console.log(err));
  }

  sortCaseInsensitive(a, b) {
    const formatA = a.toLowerCase();
    const formatB = b.toLowerCase();
    if (formatA < formatB) return -1;
    if (formatA > formatB) return 1;
    return 0;
  }

  formatExerciseTypeOptions(exerciseTypes) {
    const muscleGroupChoice = this.state.groupChoice;
    const filterFunc = (et)=> et.musclegroups.indexOf(muscleGroupChoice) !== -1;
    if (muscleGroupChoice !== 'default') {
      exerciseTypes = exerciseTypes.filter(filterFunc);
    }
    return exerciseTypes
      .map(et => et.name)
      .sort(this.sortCaseInsensitive)
      .map(et => (<option key={et}>{et}</option>));
  }

  formatHelpText() {
    return (
      <p className='mt-1'>
        Can't find your exercise type? <Link to='/exerciseTypes'>Add it here!</Link>
      </p>
    );
  }

  lookupMuscleGroups(exerciseName) {
    const exerciseTypes = this.state.exerciseTypes;
    const match = exerciseTypes?.find(et => et.name === exerciseName);
    if (match) return match.musclegroups;
    return [];
  }

  handleClick() {
    // check state variables to make sure configured exercise passes validation
    const existingExercises = this.props.exercises ?? [];
    const name = this.state.name;
    const musclegroups = this.state.musclegroups;
    const sets = this.state.sets ?? [];
    if (!name) {
      return alert('Please select a workout type');
    }
    if (sets.length === 0) {
      return alert('Please add sets to exercise before adding');
    }
    // configure new exercise object and add to existing exercises
    const newExercise = { name, musclegroups, sets };
    this.props.onExercisesChange([...existingExercises, newExercise]);
    this.setState({
      name: 'default',
      groupChoice: 'default',
      musclegroups: [],
      sets: []
    });
  }

  handleSetsChange(sets) {
    this.setState({sets: sets});
  }

  handleExerciseNameChange(e) {
    const muscleGroups = this.lookupMuscleGroups(e.target.value);
    this.setState({
      name: e.target.value,
      musclegroups: muscleGroups
    });
  }

  handleGroupChange(e) {
    this.setState({
      groupChoice: e.target.value,
      name: 'default',
      musclegroups: []
    });
  }

  formatMuscleGroupDropdown() {
    const sets = this.state.sets;
    const musclegroups = this.state.allmusclegroups.map(g => g.name).sort();
    return (
      <select
        className='form-select mb-1'
        value={this.state.groupChoice}
        onChange={this.handleGroupChange}
        disabled={sets.length > 0}
      >
        <option value='default'>Filter by muscle group:</option>
        {musclegroups.map(g => (<option key={g}>{g}</option>))}
      </select>
    );
  }

  getMuscleGroups() {
    axios.get(`${process.env.REACT_APP_API_URL}api/musclegroups`)
      .then(result => this.setState({ allmusclegroups: result.data }))
      .catch(err => console.log(err));
  }
}

export default CreateExercise;
