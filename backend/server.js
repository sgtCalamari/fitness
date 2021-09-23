const express = require('express');
const connection = require('./mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

require('dotenv').config(); // exposes process.env.CONFIG_KEY

const port = process.env.PORT || 5000;
const displayName = process.env.DISPLAY_NAME || "Fitness";

// middleware
app.use(express.json()); // replaces body-parser
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api routes
app.use('/api', routes);

// react app
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));

app.listen(port, () => {
  console.log(`Node Express server for ${displayName} listening at http://localhost:${port}`);
});
