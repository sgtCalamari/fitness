import React from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WorkoutSummary from './components/WorkoutSummary';
import ExerciseTypeSummary from './components/ExerciseTypeSummary';
import CreateWorkout from './components/CreateWorkout';
import Navbar from './components/Navbar';
import Copyright from './components/Copyright';
import GARoute from './components/GARoute';

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
        <div className="container">
            <Navbar />
            <GARoute><Route path='/' exact><WorkoutSummary workouts={workouts} /></Route></GARoute>
            <GARoute><Route path='/log'><CreateWorkout onWorkoutSubmit={this.componentDidMount} /></Route></GARoute>
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
