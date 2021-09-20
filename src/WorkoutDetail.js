import React from 'react';
import ExerciseDetail from './ExerciseDetail'
import './WorkoutDetail.css'

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
        <p onClick={this.state.show ? this.handleClick : null}>
          {this.props.date.toString()} <strong>{this.props.muscleGroups.join('/')}</strong>
          <button className={this.state.show ? 'toggled' : ''}>{(this.state.show ? 'Hide' : 'Show') + ' Exercises'}</button>
        </p>
        {this.state.show && <div><ul>
          {this.props.exercises.map((e) => <li key={e.name}><ExerciseDetail name={e.name} sets={e.sets} /></li>)}
        </ul></div>}
      </div>
    );
  }
}

export default WorkoutDetail;
