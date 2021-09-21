import React from 'react';
import SetList from './SetList';

class CreateSet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.toggleType = this.toggleType.bind(this);
    this.state = {
      duration: 0,
      weight: 0,
      reps: 0,
      isCardio: false
    };
  }

  handleClick() {
    // check state variables to make sure configured set passes validation
    const existingSets = this.props.sets ?? [];
    const duration = this.state.duration;
    const weight = this.state.weight;
    const reps = this.state.reps;
    if (duration === 0 && (weight === 0 || reps === 0)) {
      return alert('Please enter either duration or weight/reps');
    }
    // configure new set object and add to existing sets
    const newSet = { duration, weight, reps };
    this.props.onSetsChange([...existingSets, newSet]);
  }

  handleDurationChange(e) {
    this.setState({ duration: parseFloat(e.target.value) });
  }

  handleWeightChange(e) {
    this.setState({ weight: parseFloat(e.target.value) });
  }

  handleRepsChange(e) {
    this.setState({ reps: parseFloat(e.target.value) });
  }

  toggleType() {
    this.setState((state) => ({
      isCardio: !state.isCardio
    }));
  }

  render() {
    const formClass = 'row row-cols-lg-auto g-3 align-items-center';
    const isCardio = this.state.isCardio;
    const duration = isNaN(this.state.duration) ? '' : this.state.duration;
    const weight = isNaN(this.state.weight) ? '' : this.state.weight;
    const reps = isNaN(this.state.reps) ? '' : this.state.reps;
    const sets = this.props.sets ?? [];
    return(
      <div className='card me-2'>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='card-title'>Add Sets:</h5>
          <div className='btn btn-small btn-dark mt-1' onClick={this.toggleType}>
            Toggle Set Type
          </div>
        </div>
        <div className='card-body'>
          <div className={formClass}>
            {isCardio && <div className='col-12'>
              <label>Duration (in minutes): </label>
              <input id='duration' type='number' value={duration} onChange={this.handleDurationChange} />
            </div>}
            {!isCardio && <>
              <div className='col-12'>
                <label>Weight: </label>
                <input id='weight' type='number' value={weight} onChange={this.handleWeightChange} />
              </div>
              <div className='col-12'>
                <label>Reps: </label>
                <input id='reps' type='number' value={reps} onChange={this.handleRepsChange} />
              </div>
            </>}
            <div className='col-12'>
              <div className='btn btn-primary btn-sm' onClick={this.handleClick}>+ Add</div>
            </div>
          </div>
          {sets.length > 0 && <div className='card mt-1'>
            <div className='card-body'>
              <SetList sets={sets} />
            </div>
          </div>}
        </div>
      </div>
    );
  }
}

export default CreateSet;
