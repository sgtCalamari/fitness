import React from 'react';

class SetDetail extends React.Component {
  render() {
    const duration = this.props.duration;
    const weight = this.props.weight;
    const reps = this.props.reps;
    return(
      <p style={{display:'inline'}}>{formatMessage(duration, weight, reps)}</p>
    );
  }
}

function formatMessage(duration, weight, reps) {
  if (duration) return `${duration} minutes`;
  let weightMessage = '';
  if (weight) weightMessage = `${weight} lbs x `;
  let repsMessage = `${reps ?? '0'} rep`;
  if (reps !== 1) repsMessage += 's';
  return weightMessage + repsMessage;
}

export default SetDetail;
