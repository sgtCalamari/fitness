import WorkoutSummary from './WorkoutSummary';
import './App.css'

function App() {
  return (
    <div className="App">
      <WorkoutSummary workouts={WORKOUTS} />
    </div>
  );
}

const WORKOUTS = [
  {date: new Date('2021-08-31'), muscleGroups: ['chest', 'shoulder'], exercises: [
    {name: 'pectoral fly', sets: [
      {weight: 107, reps: 12},
      {weight: 120, reps: 12},
      {weight: 120, reps: 12},
      {weight: 120, reps: 12}
    ]},
    {name: 'chest press', sets: [
      {weight: 90, reps: 12},
      {weight: 100, reps: 12},
      {weight: 100, reps: 12},
      {weight: 100, reps: 10}
    ]},
    {name: 'shoulder press', sets: [
      {weight: 80, reps: 12},
      {weight: 90, reps: 10},
      {weight: 80, reps: 12},
      {weight: 80, reps: 12}
    ]}
  ]},
  {date: new Date('2021-09-02'), muscleGroups: ['quads', 'abs'], exercises: [
    {name: 'leg press', sets: [
      {weight: 200, reps: 12},
      {weight: 220, reps: 12},
      {weight: 220, reps: 12},
      {weight: 220, reps: 12},
      {weight: 220, reps: 12}
    ]},
    {name: 'squats', sets: [
      {weight: 140, reps: 12},
      {weight: 140, reps: 12},
      {weight: 140, reps: 12},
      {weight: 140, reps: 10},
    ]},
    {name: 'bosu tips', sets: [
      {reps: 30},
      {reps: 30},
      {reps: 30},
      {reps: 30}
    ]}
  ]},
  {date: new Date('2021-09-03'), muscleGroups: ['biceps','triceps'], exercises: [
    {name: 'bicep curl', sets: [
      {weight: 100, reps: 1}
    ]}
  ]}
];

export default App;
