import React from 'react';
import ExerciseDetail from './ExerciseDetail'
import './WorkoutDetail.css'

class WorkoutDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleShowExercisesButtonClick = this.handleShowExercisesButtonClick.bind(this);
    this.state = {
      showExercises: false
    }
  }

  handleShowExercisesButtonClick() {
    this.setState((state) => ({
      showExercises: !state.showExercises
    }));
  }

  render() {
    return (
      <div>
        <p>
          {this.props.date.toString()} ({this.props.muscleGroups.join('/')})
          <button onClick={this.handleShowExercisesButtonClick}>Show Exercises</button>
        </p>
        {this.state.showExercises && <div><ul>
          {this.props.exercises.map((e) => <li key={e.name}><ExerciseDetail name={e.name} sets={e.sets} /></li>)}
        </ul></div>}
      </div>
    );
  }
}

export default WorkoutDetail;
