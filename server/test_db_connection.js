require('dotenv').config(); 
const mongoose = require('mongoose');

async function testDbConnection() {
  console.log('Attempting to connect to MongoDB...');
  console.log('Using MONGODB_URI:', process.env.MONGODB_URI ? '***** (present)' : 'NOT FOUND/UNDEFINED');

  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in your .env file!');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('SUCCESS: MongoDB connected successfully!');
  } catch (error) {
    console.error('FAILURE: MongoDB connection error:');
    console.error(error);
  } finally {
  }
}

testDbConnection();