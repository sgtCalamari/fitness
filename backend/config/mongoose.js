const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME || 'fitness'
};
mongoose.connect(uri, options);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB connection opened successfully at ${uri}`);
});
