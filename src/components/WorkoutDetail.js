import React from 'react';
import ExerciseList from './ExerciseList';

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

    const buttonText = showDiv ? '-' : '+';
    const buttonClass = 'btn btn-sm mx-1 btn-light';
    const divClass = 'd-flex justify-content-between align-items-center';
    const locationTag = location ? (<span className="ms-1">@ {location}</span>) : null;

    return (
      <div onClick={showDiv ? null : this.handleClick}>
        <div className={divClass} onClick={showDiv ? this.handleClick : null}>
          <p className='ms-1 mt-2'>
            <button className={buttonClass}>{buttonText}</button>
            <span className='workoutInfo'>
              {date}
              {locationTag}
              <b className='ms-1'>({muscleGroups})</b>
            </span>
          </p>
        </div>
        {showDiv && <ExerciseList exercises={exercises} />}
      </div>
    );
  }
}

export default WorkoutDetail;
