import { Router } from 'express';
import {
  createTask,
  getTasks,
  getNextTask,
  completeTask,
  deleteTask,
} from '../controllers/taskController';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.post('/:id/complete', completeTask);

export default router;
