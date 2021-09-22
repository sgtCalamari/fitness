import React from 'react';
import ExerciseList from './ExerciseList';
import CreateSet from  './CreateSet';

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.state = {
      name: '',
      musclegroups: [],
      sets: []
    };
  }

  getExerciseTypes() {
    return this.props.exerciseTypes ?? [ // apply defaults if falsy
      {name: 'pectoral fly', musclegroups: ['chest']},
      {name: 'chest press', musclegroups: ['chest']},
      {name: 'shoulder press', musclegroups: ['shoulders']},
      {name: 'leg press', musclegroups: ['quads']},
      {name: 'squats', musclegroups: ['glutes','quads']},
      {name: 'bosu tips', musclegroups: ['abs']},
      {name: 'bicep curl', musclegroups: ['biceps']},
      {name: 'tricep press', musclegroups: ['triceps']},
      {name: 'tricep extension', musclegroups: ['triceps']},
    ];
  }

  formatExerciseTypeOptions(exerciseTypes) {
    return exerciseTypes.map(et => et.name).sort().map(et => (
      <option key={et}>{et}</option>
    ));
  }

  lookupMuscleGroups(exerciseName) {
    const exerciseTypes = this.getExerciseTypes();
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
      return alert('please select a workout type');
    }
    if (sets.length === 0) {
      return alert('please add sets to exercise before adding');
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
    const muscleGroups = this.state.musclegroups?.sort().join('/');
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
                {this.formatExerciseTypeOptions(this.getExerciseTypes())}
              </select>
            </div>
            <div className='col-12'>
              <input type='text' readOnly disabled value={muscleGroups} />
            </div>
            <CreateSet onSetsChange={this.handleSetsChange} sets={sets} />
            <div className={buttonClass} onClick={this.handleClick}>+ Add Exercise</div>
          </div>
        </div>
        <ExerciseList exercises={exercises} />
      </div>
    );
  }
}

export default CreateExercise;
