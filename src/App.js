import WorkoutSummary from './components/WorkoutSummary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <WorkoutSummary workouts={WORKOUTS} />
    </div>
  );
}

const WORKOUTS = [
  {"username": 'joe', "date": new Date('2021-08-31'), "isWithTrainer": false, "location": null, "exercises": [
    {"name": 'pectoral fly', "musclegroups": ['chest'], "sets": [
      {"weight": 107, "reps": 12},
      {"weight": 120, "reps": 12},
      {"weight": 120, "reps": 12},
      {"weight": 120, "reps": 12}
    ]},
    {"name": 'chest press', "musclegroups": ['chest'], "sets": [
      {"weight": 90, "reps": 12},
      {"weight": 100, "reps": 12},
      {"weight": 100, "reps": 12},
      {"weight": 100, "reps": 10}
    ]},
    {"name": 'shoulder press', "musclegroups": ['shoulders'], "sets": [
      {"weight": 80, "reps": 12},
      {"weight": 90, "reps": 10},
      {"weight": 80, "reps": 12},
      {"weight": 80, "reps": 12}
    ]}
  ]},
  {"username": 'joe', "date": new Date('2021-09-02'), "isWithTrainer": false, "location": null, "exercises": [
    {"name": 'leg press', "musclegroups": ['quads'], "sets": [
      {"weight": 200, "reps": 12},
      {"weight": 220, "reps": 12},
      {"weight": 220, "reps": 12},
      {"weight": 220, "reps": 12},
      {"weight": 220, "reps": 12}
    ]},
    {"name": 'squats', "musclegroups": ['quads', 'glutes'], "sets": [
      {"weight": 140, "reps": 12},
      {"weight": 140, "reps": 12},
      {"weight": 140, "reps": 12},
      {"weight": 140, "reps": 10},
    ]},
    {"name": 'bosu tips', "musclegroups": ['abs'], "sets": [
      {"reps": 30},
      {"reps": 30},
      {"reps": 30},
      {"reps": 30}
    ]}
  ]},
  {"username": 'joe', "date": new Date('2021-09-03'), "isWithTrainer": false, "location": null, exercises: [
    {"name": 'bicep curl', "musclegroups": ['biceps'], "sets": [
      {"weight": 100, "reps": 1}
    ]}
  ]}
];

export default App;
