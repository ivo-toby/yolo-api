import { Request, Response, NextFunction } from 'express';
import { taskStore } from '../services/taskStore';
import { AppError } from '../middleware/errorHandler';
import { Difficulty } from '../models/Task';

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, difficulty } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new AppError(400, 'Title is required');
    }

    if (difficulty && !Object.values(Difficulty).includes(difficulty)) {
      throw new AppError(400, 'Invalid difficulty level');
    }

    const task = taskStore.create({
      title: title.trim(),
      description,
      difficulty,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    let tasks;
    if (status === 'incomplete') {
      tasks = taskStore.getIncomplete();
    } else if (status === 'completed') {
      tasks = taskStore.getCompleted();
    } else {
      tasks = taskStore.getAll();
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getNextTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = taskStore.getRandomIncomplete();

    if (!task) {
      throw new AppError(404, 'No tasks available');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const completeTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const task = taskStore.findById(id);
    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    if (task.completedAt !== null) {
      throw new AppError(400, 'Task already completed');
    }

    const completedTask = taskStore.complete(id);
    res.status(200).json(completedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = taskStore.delete(id);
    if (!deleted) {
      throw new AppError(404, 'Task not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
