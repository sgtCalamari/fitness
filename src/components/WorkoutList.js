import React from 'react';
import moment from 'moment';
import WorkoutDetail from './WorkoutDetail';
import './WorkoutList.css';

class WorkoutList extends React.Component {
  render() {
    const workouts = this.props.workouts ?? [];
    return <div className='accordion'>
      {workouts.map((w) => {
        const id = w._id;
        const key = id;
        const date = moment(w.date).format('ddd MMM DD, yyyy');
        const location = w.location;
        const exercises = w.exercises;
        return (
          <div key={key} className="accordion-item">
            <WorkoutDetail
              id={id}
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
