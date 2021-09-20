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

  render() {
    return (
      <div onClick={this.state.show ? null : this.handleClick}>
        <div className='d-flex justify-content-between align-items-center'
          onClick={this.state.show ? this.handleClick : null}>
          <p className='ms-1 mt-2'>
            {this.props.date} <b>{this.props.muscleGroups.join('/')}</b>
          </p>
          <button
            className={'btn btn-sm me-1 '+(this.state.show?'btn-secondary':'btn-primary')}>
              {(this.state.show ? 'Hide' : 'Show') + ' Exercises'}
          </button>
        </div>
        {this.state.show &&
          <div>
            <ul>
              {this.props.exercises.map((e) => <li key={e.name}><ExerciseDetail name={e.name} sets={e.sets} /></li>)}
            </ul>
          </div>}
      </div>
    );
  }
}

export default WorkoutDetail;
