const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

require('dotenv').config(); // exposes process.env.CONFIG_KEY

// configures db and opens global connection that can
// be used in any module with `mongoose.connection`
require('./config/mongoose');
require('./models');

const port = process.env.PORT || 5000;
const displayName = process.env.DISPLAY_NAME || "Fitness";

// passport
require('./config/passport')(passport);
app.use(passport.initialize());

// middleware
app.use(express.json()); // replaces body-parser
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api routes
app.use('/api', routes);

// react app
const reactPath = path.join(__dirname, '..', 'build');
app.use(express.static(reactPath));
app.get('/*', (req, res) => res.sendFile(path.join(reactPath, 'index.html')));

app.listen(port, () => {
  console.log(`Node Express server for ${displayName} listening at http://localhost:${port}`);
});
