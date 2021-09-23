import React from 'react';
import axios from 'axios';

class CreateExerciseType extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardioCheck = this.handleCardioCheck.bind(this);
    this.handleMuscleGroupAdd = this.handleMuscleGroupAdd.bind(this);
    this.state = {
      name: '',
      isCardio: false,
      musclegroups: [],
      availableGroups: []
    };
  }

  componentDidMount() {
    this.getMuscleGroups();
    this.setState((state) => ({availableGroups: state.availableGroups}));
  }

  handleClick() {
    const name = this.state.name;
    const isCardio = this.state.isCardio;
    const musclegroups = this.state.musclegroups;
    if (!name || name.length === 0) return alert('Please enter a valid name');
    if (musclegroups.length === 0) {
      if (isCardio) musclegroups.push('cardio');
      else return alert('Please enter at least one muscle group');
    }

    const newExerciseType = { name, musclegroups };

    this.setState((state) => ({
      name: '',
      isCardio: false,
      musclegroups: []
    }));
    this.getMuscleGroups();
    this.props.onSubmitNewType?.(newExerciseType);
  }

  getMuscleGroups() {
    axios.get('https://fitness.joemart.in/api/musclegroups')
      .then(result => this.setState({ availableGroups: result.data }))
      .catch(err => console.log(err));
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCardioCheck() {
    this.setState((state) => ({
      isCardio: !state.isCardio,
      musclegroups: !state.isCardio ? ['cardio'] : []
    }));
    this.getMuscleGroups();
  }

  handleMuscleGroupAdd() {
    const choice = document.querySelectorAll('select').valueOf('selected')[0].value;
    if (choice?.length > 0)
      this.setState((state) => ({
        musclegroups: [...state.musclegroups, choice],
        availableGroups: state.availableGroups.filter(sg => sg.name !== choice)
      }));
  }

  formatMuscleGroups(isCardio) {
    const muscleGroups = this.state.musclegroups.join('/');
    if (isCardio) return (
      <input className='form-control' type='text' readOnly disabled value={muscleGroups} />
    );
    const availableGroups = this.state.availableGroups
      ?.map(g => g.name)
      ?.filter(g => g !== 'cardio').sort(); // remove cardio
    return (
      <div>
        <select
          className='form-select mb-1'
          onChange={this.handleMuscleGroupSelect}
        >
          {availableGroups?.map(g => (<option key={g}>{g}</option>))}
        </select>
        {muscleGroups.length > 0 && <input className='form-control mb-1' type='text' readOnly disabled value={muscleGroups} />}
        <button className='btn btn-sm btn-outline-primary' onClick={this.handleMuscleGroupAdd}>+ Add</button>
      </div>
    );
  }

  render() {
    const name = this.state.name;
    const isCardio = this.state.isCardio;
    return (
      <div className='card mt-1'>
        <h4 className='card-title mt-1 ms-1'>Create Exercise Type</h4>
        <div className='card-body row'>
          <div className='col-auto mb-2'>
            <label className='form-label'>Name</label>
            <input
              className='form-control'
              type='text'
              value={name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className='col-auto mb-2 d-grid'>
            <button className='btn btn-sm btn-outline-dark' onClick={this.handleCardioCheck}>
              Is Cardio?
            </button>
          </div>
          <div className='col-auto mb-2'>
            <label className='form-label'>Muscle Group(s)</label>
            {this.formatMuscleGroups(isCardio)}
          </div>
          <div className='d-grid mb-2'>
            <button className='btn btn-sm btn-primary' onClick={this.handleClick}>+ Add Exercise Type</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateExerciseType;