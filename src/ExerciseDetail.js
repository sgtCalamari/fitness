import React from 'react';
import SetDetail from './SetDetail'

class ExerciseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      show: false
    };
  }

  handleClick() {
    this.setState((state, props) => ({
      show: !state.show
    }));
  }

  render() {
    return (
      <div onClick={this.state.show ? null : this.handleClick}>
        <p onClick={this.state.show ? this.handleClick : null}>
          {this.props.name}
          <button className={this.state.show ? 'toggled' : ''}>{(this.state.show ? "Hide" : "Show") + ' Sets'} </button>
        </p>
        {this.state.show && <ul>
          {this.props.sets.map((s, i) => <li key={i}><SetDetail weight={s.weight} reps={s.reps} /></li>)}
        </ul>}
      </div>
    );
  }
}

export default ExerciseDetail;
