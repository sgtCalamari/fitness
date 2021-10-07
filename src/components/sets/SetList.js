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
    return (<ul className='ms-3 mb-3'>{sets.map((s, i) =>
      <li
        key={i}
        style={{listStyleType: 'square'}}
      >
        <div className='d-flex justify-content-between'>
          <SetDetail duration={s.duration} weight={s.weight} reps={s.reps} />
          {this.props.onRemove && this.formatRemoveButton(i)}
        </div>
      </li>
    )}</ul>);
  }

  handleRemoveSet(e) {
    const sets = this.props.sets;
    const index = e.target.id;
    console.log(index);
    sets.splice(index, 1);
    console.log(sets);
    this.props.onRemove(sets);
  }

  formatRemoveButton(i) {
    return (
      <button
        className='btn btn-outline-danger btn-sm'
        style={{display:'inline'}}
        id={i}
        onClick={this.handleRemoveSet}
      >
        x
      </button>
    );
  }
}

export default SetList;
