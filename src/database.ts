import 'dotenv/config.js';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    console.log('Connecting to Database...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected.');
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
