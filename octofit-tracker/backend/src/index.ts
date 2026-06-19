import express from 'express';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import activityRoutes from './routes/activityRoutes';
import workoutRoutes from './routes/workoutRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use(errorHandler);

export default app;
