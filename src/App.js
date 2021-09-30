import React from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserLogin from './components/login/UserLogin';
import WorkoutSummary from './components/workouts/WorkoutSummary';
import ExerciseTypeSummary from './components/exerciseTypes/ExerciseTypeSummary';
import CreateWorkout from './components/workouts/CreateWorkout';
import Navbar from './components/main/Navbar';
import Copyright from './components/main/Copyright';
import GARoute from './components/main/GARoute';
import PrivateRoute from './components/main/PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      workouts: []
    };
  }

  componentDidUpdate() {
    ReactGA.initialize('UA-161551757-5');
    ReactGA.pageview('/');
  }

  render() {
    const workouts = this.state.workouts;
    return (
      <div style={{background: "url('/groovepaper.png')", height: '100vh'}}>
      <Router>
        <div className="container-fluid">
            <Navbar />
            <GARoute><Route path='/login' component={UserLogin} /></GARoute>
            <GARoute>
              <PrivateRoute path='/' exact>
                <WorkoutSummary workouts={workouts} />
              </PrivateRoute>
            </GARoute>
            <GARoute>
              <PrivateRoute path='/log' exact>
                <CreateWorkout onWorkoutSubmit={this.componentDidMount} />
              </PrivateRoute>
            </GARoute>
            <GARoute>
              <PrivateRoute path='/exerciseTypes'>
                <ExerciseTypeSummary />
              </PrivateRoute>
            </GARoute>
            <Copyright />
        </div>
      </Router>
      </div>
    );
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(auth)?.token;
    }
    const username = localStorage.getItem('username');
    if (username) {
      axios.get(process.env.REACT_APP_API_URL + 'api/workouts/' + username)
        .then(response => this.setState({ workouts: response.data }))
        .catch(error => console.log(error));
    }
  }
}

export default App;
