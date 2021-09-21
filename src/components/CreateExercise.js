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
      showList: true,
      name: '',
      muscleGroups: [],
      sets: []
    };
  }

  getExerciseTypes() {
    return this.props.exerciseTypes ?? [ // apply defaults if falsy
      {name: 'pectoral fly', muscleGroups: ['chest']},
      {name: 'chest press', muscleGroups: ['chest']},
      {name: 'shoulder press', muscleGroups: ['shoulders']},
      {name: 'leg press', muscleGroups: ['quads']},
      {name: 'squats', muscleGroups: ['glutes','quads']},
      {name: 'bosu tips', muscleGroups: ['abs']},
      {name: 'bicep curl', muscleGroups: ['biceps']},
      {name: 'tricep press', muscleGroups: ['triceps']},
      {name: 'tricep extension', muscleGroups: ['triceps']},
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
    if (match) return match.muscleGroups;
    return [];
  }

  handleClick() {
    // check state variables to make sure configured exercise passes validation
    const name = this.state.name;
    const muscleGroups = this.state.muscleGroups;
    const sets = this.state.sets ?? [];
    if (sets.length === 0) return alert('please add sets to exercise before adding');
    const existingExercises = this.props.exercises ?? [];
    // configure new exercise object and add to existing exercises
    const newExercise = {
      name,
      muscleGroups,
      sets
    };
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
      muscleGroups: muscleGroups
    });
  }

  render() {
    const defaultExerciseName = this.getExerciseTypes().map(e => e.name).sort()[0];
    const exerciseName = this.state.name ?? defaultExerciseName;
    const exercises = this.state.exercises;
    const showList = this.state.showList ?? false;
    const muscleGroups = (this.state.muscleGroups?.length > 0)
      ? this.state.muscleGroups?.sort().join('/')
      : this.lookupMuscleGroups(defaultExerciseName);
    const formClass = 'row row-cols-lg-auto g-3 align-items-center';
    const buttonClass = 'btn btn-primary btn-sm';
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
                value={exerciseName}
                onChange={this.handleExerciseNameChange}>
                {this.formatExerciseTypeOptions(this.getExerciseTypes())}
              </select>
            </div>
            <div className='col-12'>
              <input type='text' readOnly disabled value={muscleGroups} />
            </div>
            <CreateSet onSetsChange={this.handleSetsChange} sets={sets} />
            <div className={buttonClass} onClick={this.handleClick}>+ Add</div>
          </div>
        </div>
        {showList && <ExerciseList exercises={exercises} />}
      </div>
    );
  }
}

export default CreateExercise;
