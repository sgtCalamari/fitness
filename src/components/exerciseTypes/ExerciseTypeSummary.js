import React from 'react';
import axios from 'axios';
import CreateExerciseType from './CreateExerciseType';
import ExerciseTypeList from './ExerciseTypeList';

class ExerciseTypeSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewExerciseType = this.handleNewExerciseType.bind(this);
    this.state = {
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

  handleNewExerciseType(exerciseType) {
    axios.post(`${process.env.REACT_APP_API_URL}api/exerciseTypes/add`, exerciseType)
      .then(result => {
        console.log(result);
        this.setState((state) => ({
          exerciseTypes: [...state.exerciseTypes, exerciseType]
        }))
      })
      .catch(err => console.log(err));

  }

  getExerciseTypes() {
    axios.get(`${process.env.REACT_APP_API_URL}api/exerciseTypes`)
      .then(types => this.setState({exerciseTypes: types.data}))
      .catch(err => console.log(err));
  }

  render() {
    const types = this.state.exerciseTypes;
    return (
      <div>
        <h1>Exercise Types</h1>
        <CreateExerciseType onSubmitNewType={this.handleNewExerciseType} />
        {types.length > 0 && <ExerciseTypeList exerciseTypes={types} />}
      </div>
    );
  }
}

export default ExerciseTypeSummary;
