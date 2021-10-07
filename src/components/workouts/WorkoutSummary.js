import React from 'react';
import WorkoutList from './WorkoutList';

class WorkoutSummary extends React.Component {
  render() {
    const workouts = this.props.workouts;
    return(
      <div>
        <h1>Workout Summary</h1>
        {(workouts && workouts.length > 0) &&
          <WorkoutList workouts={workouts} />}
        {(!workouts || workouts?.length === 0) &&
          <div className='alert alert-secondary text-center'>
            No workouts to show.<br/>
            Ready to <a className="alert-link" href='/log'>log a workout</a>?
          </div>}
      </div>
    );
  }
}

export default WorkoutSummary;
