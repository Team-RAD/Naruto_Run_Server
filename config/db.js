const mongoose = require('mongoose');

const db = process.env.MONGODB_URI || 'mongodb://localhost/naruto_run';

// const db = "mongodb+srv://admin:anm1q0sQN9MbtBBA@cluster0.jx4mk.mongodb.net/naruto_run?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected', db);
  } catch (error) {
      console.error(error.message);
      process.exit(1)
  }
};

module.exports = connectDB; 