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
      <Router>
        <div className="container-fluid">
            <Navbar />
            <GARoute><Route path='/login' component={UserLogin} /></GARoute>
            <GARoute><Route path='/' exact><WorkoutSummary workouts={workouts} /></Route></GARoute>
            <GARoute><Route path='/log' exact><CreateWorkout onWorkoutSubmit={this.componentDidMount} /></Route></GARoute>
            <GARoute><Route path='/exerciseTypes' component={ExerciseTypeSummary} /></GARoute>
            <Copyright />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    axios.get('https://fitness.joemart.in/api/workouts/')
      .then(response => this.setState({ workouts: response.data }))
      .catch(error => console.log(error));
  }
}

export default App;
