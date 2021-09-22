import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import WorkoutSummary from './components/WorkoutSummary';
import CreateWorkout from './components/CreateWorkout';
import Navbar from './components/Navbar';
import Copyright from './components/Copyright';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };
  }

  render() {
    const workouts = this.state.workouts;
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Route path='/' exact><WorkoutSummary workouts={workouts} /></Route>
          <Route path='/log'><CreateWorkout /></Route>
          <Copyright />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    axios.get('http://fitapi.joemart.in/workouts/')
      .then(response => this.setState({ workouts: response.data }))
      .catch(error => console.log(error));
    }
}

export default App;
