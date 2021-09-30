import React from 'react';
import SetList from '../sets/SetList';

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
    const showDiv = this.state.show;

    const name = this.props.name;
    const muscleGroups = this.props.musclegroups?.sort().join('/');
    const sets = this.props.sets;

    const buttonClass = 'btn btn-sm me-1';
    const buttonText = (showDiv ? "-" : "+");
    const divClass = 'd-flex align-items-center justify-content-between';

    return (
      <div onClick={showDiv ? null : this.handleClick}>
        <div className={divClass} onClick={showDiv ? this.handleClick : null}>
          <p className='exerciseInfo'>
            <button className={buttonClass}>
              {buttonText}
            </button>
            {name} <b>({muscleGroups})</b>
          </p>
        </div>
        {showDiv && <SetList sets={sets} />}
      </div>
    );
  }
}

export default ExerciseDetail;
