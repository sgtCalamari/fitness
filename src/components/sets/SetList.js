import React from 'react';
import SetDetail from './SetDetail'

class SetList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveSet = this.handleRemoveSet.bind(this);
  }

  render() {
    const sets = this.props.sets ?? [];
    if (sets.length === 0) return null;
    return this.formatSets(sets);
  }

  formatSets(sets) {
    sets.forEach(s => console.log(s));
    return (<ul className='ms-3'>{sets.map((s, i) =>
      <li
        key={i}
        className='justify-content-between'
        style={{listStyleType: 'square'}}
      >
        <SetDetail duration={s.duration} weight={s.weight} reps={s.reps} />
        {this.props.onRemove && this.formatRemoveButton(i)}
      </li>
    )}</ul>);
  }

  handleRemoveSet(e) {
    console.log(e);
    const sets = this.props.sets;
    const index = e.target.id;
    delete sets[index];
    this.props.onRemove(sets);
  }

  formatRemoveButton(i) {
    return (
      <button
        className='btn btn-outline-danger btn-sm'
        id={i}
        onClick={this.handleRemoveSet}
      >
        x
      </button>
    );
  }
}

export default SetList;
