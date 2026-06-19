import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';

// Seed the octofit_db database with test data
async function seed() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Ari Octo', email: 'ari@octofit.com' },
    { name: 'Nia Tracker', email: 'nia@octofit.com' },
    { name: 'Mona Agent', email: 'mona@octofit.com' }
  ]);

  const teams = await Team.create([
    { name: 'Team Kraken', members: [users[0]._id, users[1]._id] },
    { name: 'Team Nautilus', members: [users[2]._id] }
  ]);

  const workouts = await Workout.create([
    { name: 'Morning HIIT', description: 'Quick high-intensity interval training', difficulty: 'intermediate', durationMinutes: 25, exercises: ['burpees', 'jump squats', 'mountain climbers'] },
    { name: 'Recovery Yoga', description: 'Gentle stretch and mobility flow', difficulty: 'beginner', durationMinutes: 30, exercises: ['cat-cow', 'child pose', 'downward dog'] },
    { name: 'Power Lift', description: 'Strength-focused circuit session', difficulty: 'advanced', durationMinutes: 45, exercises: ['deadlift', 'bench press', 'pull-ups'] }
  ]);

  await Activity.create([
    { user: users[0]._id, team: teams[0]._id, type: 'run', durationMinutes: 35, caloriesBurned: 420 },
    { user: users[1]._id, team: teams[0]._id, type: 'cycle', durationMinutes: 50, caloriesBurned: 580 },
    { user: users[2]._id, team: teams[1]._id, type: 'swim', durationMinutes: 40, caloriesBurned: 450 }
  ]);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
