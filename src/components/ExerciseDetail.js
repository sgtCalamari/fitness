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

  formatSets(sets) {
    return (<ul>{sets.map((s, i) =>
      <li key={i}><SetDetail weight={s.weight} reps={s.reps} /></li>
    )}</ul>);
  }

  render() {
    const showDiv = this.state.show;

    const name = this.props.name;
    const muscleGroups = this.props.musclegroups?.sort().join('/');
    const sets = this.props.sets;

    const buttonClass = 'btn btn-sm me-1 '+(showDiv?'btn-secondary':'btn-primary');
    const buttonText = (showDiv ? "Hide" : "Show") + ' Sets';
    const divClass = 'd-flex align-items-center justify-content-between';

    return (
      <div onClick={showDiv ? null : this.handleClick}>
        <div className={divClass} onClick={showDiv ? this.handleClick : null}>
          <p>{name} <b>({muscleGroups})</b></p>
          <button className={buttonClass}>{buttonText}</button>
        </div>
        {showDiv && this.formatSets(sets)}
      </div>
    );
  }
}

export default ExerciseDetail;
