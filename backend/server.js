const express = require('express');
const connection = require('./mongoose');
const routes = require('./routes');
const app = express();

require('dotenv').config(); // exposes process.env.CONFIG_KEY

const port = process.env.PORT || 5000;
const displayName = process.env.DISPLAY_NAME || "Fitness";

// middleware
app.use(express.json()); // replaces body-parser
app.use(express.urlencoded({extended: true}));

// app routes
app.use('/users', routes.users);
app.use('/workouts', routes.workouts);
app.use('/muscleGroups', routes.muscleGroups);

app.listen(port, () => {
  console.log(`Node Express server for ${displayName} listening at http://localhost:${port}`);
});
