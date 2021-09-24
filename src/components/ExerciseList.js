import React from 'react';
import ExerciseDetail from './ExerciseDetail'

class ExerciseList extends React.Component {
  formatExercises(ex) {
    return(ex.map((e) =>
      <li key={e.id || e._id || e.name} style={{listStyleType: 'none'}}>
        <ExerciseDetail
          name={e.name}
          musclegroups={e.musclegroups}
          sets={e.sets} />
      </li>));
  }

  render() {
    const exercises = this.props.exercises ?? [];
    if (exercises.length === 0) return null;
    return (
      <ul>{this.formatExercises(exercises)}</ul>
    );
  }
}

export default ExerciseList;
