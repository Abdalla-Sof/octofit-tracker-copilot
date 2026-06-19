import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members').lean();
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('members').lean();
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id).lean();
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json({ success: true });
});

export default router;
