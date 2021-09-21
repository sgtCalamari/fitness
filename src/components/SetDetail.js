import React from 'react';

class SetDetail extends React.Component {
  render() {
    const weight = this.props.weight;
    const reps = this.props.reps;
    return(
      <p>{formatMessage(weight, reps)}</p>
    );
  }
}

function formatMessage(weight, reps) {
  // `${weight ? `${weight} lbs x ` : ''}${reps ?? '0'} rep${reps !== 1 ? 's' : ''}`
  let weightMessage = '';
  if (weight) weightMessage = `${weight} lbs x `;
  let repsMessage = `${reps ?? '0'} rep`;
  if (reps !== 1) repsMessage += 's';
  return weightMessage + repsMessage;
}

export default SetDetail;
