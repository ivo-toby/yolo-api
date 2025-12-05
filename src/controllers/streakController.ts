import { Request, Response, NextFunction } from 'express';
import { streakService } from '../services/streakService';

export const getStreak = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const streak = streakService.calculateStreak();
    res.status(200).json(streak);
  } catch (error) {
    next(error);
  }
};

export const getStats = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = streakService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
