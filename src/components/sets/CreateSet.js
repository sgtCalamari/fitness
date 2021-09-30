import React from 'react';
import SetList from './SetList';

class CreateSet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
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
    const isCardio = this.props.isCardio ?? false;
    const duration = this.state.duration;
    const weight = this.state.weight;
    const reps = this.state.reps;
    if (duration === 0 && isCardio) {
      return alert('Please enter duration');
    }
    if (!isCardio && weight === 0 && reps === 0) {
      return alert('Please enter weight and/or reps');
    }
    // configure new set object and add to existing sets
    const newSet = isCardio ? { duration } : { weight, reps };
    this.props.onSetsChange([...existingSets, newSet]);
  }

  handleClear() {
    this.setState({
      duration: 0,
      weight: 0,
      reps: 0
    });
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

  render() {
    const formClass = 'row row-cols-lg-auto g-3 align-items-end';
    const clearBtnClass = 'btn btn-outline-secondary btn-sm mt-1 me-1';
    const isCardio = this.props.isCardio ?? false;
    const duration = (isNaN(this.state.duration) || this.state.duration === 0) ? '' : this.state.duration;
    const weight = (isNaN(this.state.weight) || this.state.weight === 0) ? '' : this.state.weight;
    const reps = (isNaN(this.state.reps) || this.state.reps === 0) ? '' : this.state.reps;
    const sets = this.props.sets ?? [];
    return(
      <div className='card me-2'>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='card-title'>Add Sets:</h5>
          <div className={clearBtnClass} onClick={this.handleClear}>Clear</div>
        </div>
        <div className='card-body'>
          <div className={formClass}>
            {isCardio && <div className='col-12'>
              <label className='form-label'>Duration (in minutes): </label>
              <input className='form-control' id='duration' type='number' value={duration} onChange={this.handleDurationChange} />
            </div>}
            {!isCardio && <>
              <div className='col-12'>
                <label className='form-label'>Weight: </label>
                <input className='form-control' id='weight' type='number' value={weight} onChange={this.handleWeightChange} />
              </div>
              <div className='col-12'>
                <label className='form-label'>Reps: </label>
                <input className='form-control' id='reps' type='number' value={reps} onChange={this.handleRepsChange} />
              </div>
            </>}
            <div className='btn btn-primary btn-sm col-12' onClick={this.handleClick}>+ Add Set</div>
          </div>
          {sets.length > 0 &&
            <><hr/><SetList className='card-body' sets={sets} /></>}
        </div>
      </div>
    );
  }
}

export default CreateSet;
