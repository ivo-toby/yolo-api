import { Router } from 'express';
import taskRoutes from './tasks';
import { getNextTask } from '../controllers/taskController';
import { getStreak, getStats } from '../controllers/streakController';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/tasks', taskRoutes);
router.get('/next', getNextTask);
router.get('/streak', getStreak);
router.get('/stats', getStats);

export default router;
