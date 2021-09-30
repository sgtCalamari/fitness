import React from 'react';
import axios from 'axios';
import ExerciseList from './ExerciseList';
import CreateSet from  '../sets/CreateSet';

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.state = {
      name: '',
      musclegroups: [],
      sets: [],
      exerciseTypes: []
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
    this.getExerciseTypes();
  }

  getExerciseTypes() {
    axios.get('https://fitness.joemart.in/api/exerciseTypes')
      .then(types => this.setState({ exerciseTypes: types.data }))
      .catch(err => console.log(err));
  }

  formatExerciseTypeOptions(exerciseTypes) {
    return exerciseTypes.map(et => et.name).sort().map(et => (
      <option key={et}>{et}</option>
    ));
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
    this.setState({sets: []});
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
              <select
                className='form-select'
                id='exerciseName'
                onChange={this.handleExerciseNameChange}
                value={selectValue}>
                <option disabled value='default'>-- select an option --</option>
                {this.formatExerciseTypeOptions(exerciseTypes)}
              </select>
            </div>
            <div className='col-12'>
              <input className='form-control' type='text' readOnly disabled value={muscleGroups} />
            </div>
            {selectValue !== 'default' &&
              <CreateSet onSetsChange={this.handleSetsChange} isCardio={isCardio} sets={sets} />}
            <div className={buttonClass} onClick={this.handleClick}>+ Add Exercise</div>
          </div>
        </div>
        {exercises.length > 0 &&
          <><hr/><ExerciseList className='card-body' exercises={exercises} /></>}
      </div>
    );
  }
}

export default CreateExercise;
