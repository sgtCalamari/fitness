import React from 'react';
import axios from 'axios';
import ExerciseList from './ExerciseList';

class WorkoutDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.areYouFuckingSure = this.areYouFuckingSure.bind(this);
    this.state = {
      show: false
    }
  }

  handleClick() {
    this.setState((state) => ({
      show: !state.show
    }));
  }

  handleDelete() {
    axios.delete('https://fitness.joemart.in/api/workouts/' + this.props.id)
      .then(result => window.location.reload())
      .catch(err => console.log(err));
  }

  areYouFuckingSure() {
    const date = this.props.date;
    const muscleGroups = this.props.exercises
      .map(e => e.musclegroups) // gather musclegroups arrays
      .flat() // flatten musclegroups arrays
      .filter((mg, i, s) => s.indexOf(mg) === i) // get distinct
      .sort()
      .join('/');
    const location = this.props.location ? ` @ ${this.props.location}` : null;

    const confirmMessage = `you are about to delete ${date} ${location} (${muscleGroups})... are you sure?`;
    const userIsFuckingSure = window.confirm(confirmMessage);
    if (userIsFuckingSure) this.handleDelete();
    else console.log('CRISIS AVERTED! Carry on.');
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
          {showDiv && <button
            className='btn btn-sm btn-outline-danger me-1'
            onClick={this.areYouFuckingSure}
          >x</button>}
        </div>
        {showDiv && <ExerciseList exercises={exercises} />}
      </div>
    );
  }
}

export default WorkoutDetail;
