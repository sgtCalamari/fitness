import React from 'react';
import WorkoutList from './WorkoutList';

class WorkoutSummary extends React.Component {
  render() {
    const workouts = this.props.workouts;
    return(
      <div>
        <h1>Workout Summary</h1>
        <WorkoutList workouts={workouts} />
      </div>
    );
  }
}

export default WorkoutSummary;
