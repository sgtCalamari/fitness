import React from 'react';
import axios from 'axios';

class ExerciseTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.state = {
      musclegroups: [],
      groupChoice: 'default'
    }
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
    this.getMuscleGroups();
  }

  render() {
    const types = this.filterTypesByGroupChoice().sort(this.typeSortFunction);
    return (
      <div className='mt-2'>
        {this.formatMuscleGroupDropdown()}
        <div className='card'>
          <div className='card-body'>
            {types.map(t => (
              <li key={t.name}>{t.name} ({t.musclegroups?.join('/')})</li>
            ))}
          </div>
        </div>
      </div>
    );
  }

  handleGroupChange(e) {
    this.setState({groupChoice: e.target.value});
  }

  filterTypesByGroupChoice() {
    const types = this.props.exerciseTypes;
    const choice = this.state.groupChoice;
    if (choice === 'default') return types;
    return types.filter(t => t.musclegroups.indexOf(choice) !== -1);
  }

  getMuscleGroups() {
    axios.get(`${process.env.REACT_APP_API_URL}api/musclegroups`)
      .then(result => this.setState({ musclegroups: result.data }))
      .catch(err => console.log(err));
  }

  formatMuscleGroupDropdown() {
    const musclegroups = this.state.musclegroups.map(g => g.name).sort();
    return (
      <select className='form-select mb-1' value={this.state.groupChoice} onChange={this.handleGroupChange}>
        <option value='default'>Filter by muscle group:</option>
        {musclegroups.map(g => (<option key={g}>{g}</option>))}
      </select>
    );
  }

  typeSortFunction = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  }
}

export default ExerciseTypeList;
