import React from 'react';
import SetDetail from './SetDetail'

class ExerciseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleShowSetsButtonClick = this.handleShowSetsButtonClick.bind(this);
    this.state = {
      showSets: false
    };
  }

  handleShowSetsButtonClick() {
    this.setState((state, props) => ({
      showSets: !state.showSets
    }));
  }

  render() {
    return (
      <div>
        <p>
          {this.props.name}
          <button onClick={this.handleShowSetsButtonClick}>Show Sets</button>
        </p>
        {this.state.showSets && <ul>
          {this.props.sets.map((s, i) => <li key={i}><SetDetail weight={s.weight} reps={s.reps} /></li>)}
        </ul>}
      </div>
    );
  }
}

export default ExerciseDetail;
