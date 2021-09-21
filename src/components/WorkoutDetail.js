import React from 'react';
import ExerciseDetail from './ExerciseDetail'

class WorkoutDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      show: false
    }
  }

  handleClick() {
    this.setState((state) => ({
      show: !state.show
    }));
  }

  formatExercises(exercises) {
    return(exercises.map((e) =>
      <li key={e.name}>
        <ExerciseDetail name={e.name} musclegroups={e.musclegroups} sets={e.sets} />
      </li>));
  }

  render() {
    const showDiv = this.state.show;

    const date = this.props.date;
    const exercises = this.props.exercises;
    const location = this.props.location;
    const muscleGroups = exercises
      .map(e => e.musclegroups) // gather musclegroups arrays
      .flat() // flatten musclegroups arrays
      .filter((mg, i, s) => s.indexOf(mg) === i) // get distinct
      .sort()
      .join('/');

    const buttonText = (showDiv ? 'Hide' : 'Show') + ' Exercises';
    const buttonClass = 'btn btn-sm me-1 '+(showDiv?'btn-secondary':'btn-primary');
    const divClass = 'd-flex justify-content-between align-items-center';
    const locationTag = location ? (<span className="ms-1">@ {location}</span>) : null;

    return (
      <div onClick={showDiv ? null : this.handleClick}>
        <div className={divClass} onClick={showDiv ? this.handleClick : null}>
          <p className='ms-1 mt-2'>
            {date}
            {locationTag}
            <b className='ms-1'>({muscleGroups})</b>
          </p>
          <button className={buttonClass}>{buttonText}</button>
        </div>
        {showDiv && <ul>{this.formatExercises(exercises)}</ul>}
      </div>
    );
  }
}

export default WorkoutDetail;
