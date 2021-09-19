import React from 'react';
import WorkoutDetail from './WorkoutDetail'

class WorkoutList extends React.Component {
  render() {
    return this.props.workouts.map((w) => {
      const date = w.date.toUTCString().slice(0, 16);
      const muscleGroups = w.muscleGroups;
      const exercises = w.exercises;
      return <div key={date}><WorkoutDetail date={date} muscleGroups={muscleGroups} exercises={exercises} /><hr/></div>;
    });
  }
}

export default WorkoutList;
