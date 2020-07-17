const mongoose = require('mongoose');

// define the database if not running mongodb URI it will run off the local host
const db = process.env.MONGODB_URI || 'mongodb://localhost/naruto_run';

// run async function to connect to atlas it will display if connected or post an error if not
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    });
    console.log('MongoDB Atlas connected', db);
  } catch (error) {
      console.error(error.message);
      process.exit(1)
  }
};

// exports connectDB for use elsewhere 
module.exports = connectDB; 