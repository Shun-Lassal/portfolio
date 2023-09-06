import mongoose from 'mongoose'

async function connectDB()
{
  try {
    const uri = 'mongodb://127.0.0.1:27017/portfolio';
    const connection = await mongoose.createConnection(uri);
    console.log('MongoDB connected successfully');
    return connection;
  }
  catch (error)
  {
    console.log('MongoDB connection error: ', error);
    process.exit(1);
  }
}

export default connectDB;