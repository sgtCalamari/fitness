import React from 'react';
import WorkoutDetail from './WorkoutDetail'

class WorkoutList extends React.Component {
  render() {
    return <div className='accordion'>
      {this.props.workouts.map((w) => {
        const date = w.date.toUTCString().slice(0, 16);
        const location = w.location;
        const exercises = w.exercises;
        return (
          <div key={date} className="accordion-item">
            <WorkoutDetail
              className="accordion-header"
              date={date}
              location={location}
              exercises={exercises} />
          </div>
        );
      })}
    </div>;
  }
}

export default WorkoutList;
