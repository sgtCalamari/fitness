import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showNav: false
    };
  }

  handleClick() {
    this.setState((state) => ({
      showNav: !state.showNav
    }));
  }

  render() {
    const showNav = this.state.showNav;
    const paths = [
      {path: '/', text: 'Workouts'},
      {path: '/log', text: 'Log Workout'}
    ];
    const navbarContentClass = (showNav ? '' : 'hide') + ' navbar-collapse';
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>Fitness</Link>
          <button className='navbar-toggler' type='button' onClick={this.handleClick}>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={navbarContentClass} id="navbarContent">
            <ul className='navbar-nav mr-auto'>
              {formatLinks(paths)}
            </ul>
          </div>
        </div>
      </nav>
    );
  };
}

function formatLinks(paths) {
  return paths.map(p =>
    <li className='navbar-item' key={p.path}>
      <Link to={p.path} className='nav-link'>{p.text}</Link>
    </li>
  );
}

export default Navbar;
