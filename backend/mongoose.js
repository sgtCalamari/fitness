const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(uri, options);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

module.exports = connection;
