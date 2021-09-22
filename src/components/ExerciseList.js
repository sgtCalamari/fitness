import React from 'react';
import ExerciseDetail from './ExerciseDetail'

class ExerciseList extends React.Component {
  formatExercises(ex) {
    return(ex.map((e) =>
      <li key={e.name}>
        <ExerciseDetail name={e.name} musclegroups={e.musclegroups} sets={e.sets} />
      </li>));
  }

  render() {
    const exercises = this.props.exercises ?? [];
    return (
      <ul>{this.formatExercises(exercises)}</ul>
    );
  }
}

export default ExerciseList;
