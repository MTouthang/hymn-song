import mongoose from "mongoose";


const dbConnection = async() => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hymn';

    const conn = await mongoose.connect(MONGO_URI);

    if (conn) {
      console.log(`Connected to DB: ${conn.connection.host}`)
    }
  } catch (error) {
    console.log(`Not able to connect to database: ${error}`)
    process.exit(1);
  }
}

export default dbConnection