import React from 'react';
import { Link } from 'react-router-dom';
import GARoute from './GARoute';
import Logout from '../login/Logout';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.state = {
      showNav: false
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    this.setState({isLoggedIn: auth !== undefined});
  }

  handleClick() {
    const auth = localStorage.getItem('auth');
    this.setState((state) => ({
      showNav: !state.showNav,
      isLoggedIn: auth !== null
    }));
  }

  hideNav() {
    this.setState({showNav: false});
  }

  render() {
    const showNav = this.state.showNav;
    const paths = [
      {path: '/', text: 'Workouts'},
      {path: '/log', text: 'Log Workout'},
      {path: '/exerciseTypes', text: 'Exercise Types'}
    ];
    const navbarContentClass = (showNav ? '' : 'hide') + ' navbar-collapse justify-content-between';
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg mb-1'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand' onClick={this.hideNav}>Fitness</Link>
          <button className='navbar-toggler' type='button' onClick={this.handleClick} style={{borderStyle:'none'}}>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={navbarContentClass} id="navbarContent">
            <ul className='navbar-nav mr-auto'>
              {paths.map(p =>
                (<li className='navbar-item' key={p.path} onClick={this.handleClick}>
                  <GARoute>
                    <Link to={p.path} className='nav-link'>{p.text}</Link>
                  </GARoute>
                </li>))}
            </ul>
            {this.state.isLoggedIn &&
              <div onClick={this.handleClick}>
                <ul className='navbar-nav mr-auto'>
                  <li><hr/></li>
                  <li className='navbar-item'>
                    <GARoute>
                      <Logout className='nav-link' />
                    </GARoute>
                  </li>
                </ul>
              </div>}
          </div>
        </div>
      </nav>
    );
  };
}

export default Navbar;
