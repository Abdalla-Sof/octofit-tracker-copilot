import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(MONGO_URL);
  console.log(`Connected to MongoDB at ${MONGO_URL}`);
}

export default mongoose;
