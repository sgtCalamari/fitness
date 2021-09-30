import React from 'react';
import SetDetail from './SetDetail'

class SetList extends React.Component {
  formatSets(sets) {
    return (<ul className='ms-3'>{sets.map((s, i) =>
      <li key={i} style={{listStyleType: 'square'}}>
        <SetDetail duration={s.duration} weight={s.weight} reps={s.reps} />
      </li>
    )}</ul>);
  }

  render() {
    const sets = this.props.sets ?? [];
    if (sets.length === 0) return null;
    return this.formatSets(sets);
  }
}

export default SetList;
