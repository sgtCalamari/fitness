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
        <div
          className='d-flex align-items-center justify-content-between'
          onClick={this.state.show ? this.handleClick : null}>
          <p>{this.props.name}</p>
          <button className={'btn btn-sm me-1 '+(this.state.show?'btn-secondary':'btn-primary')}>
            {(this.state.show ? "Hide" : "Show") + ' Sets'}
          </button>
        </div>
        {this.state.show && <ul>
          {this.props.sets.map((s, i) => <li key={i}><SetDetail weight={s.weight} reps={s.reps} /></li>)}
        </ul>}
      </div>
    );
  }
}

export default ExerciseDetail;
