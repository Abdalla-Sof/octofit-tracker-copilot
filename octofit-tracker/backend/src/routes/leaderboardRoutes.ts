import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$user',
        totalCalories: { $sum: '$caloriesBurned' },
        totalDuration: { $sum: '$durationMinutes' },
        activities: { $sum: 1 }
      }
    },
    { $sort: { totalCalories: -1 } },
    { $limit: 10 }
  ]);

  res.json(leaderboard);
});

export default router;
