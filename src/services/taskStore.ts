import { Task, CreateTaskDto, Difficulty } from '../models/Task';
import { randomUUID } from 'crypto';

class TaskStore {
  private tasks: Task[] = [];

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description || '',
      difficulty: dto.difficulty || Difficulty.MEDIUM,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    this.tasks.push(task);
    return task;
  }

  getAll(): Task[] {
    return [...this.tasks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getIncomplete(): Task[] {
    return this.tasks.filter((task) => task.completedAt === null);
  }

  getCompleted(): Task[] {
    return this.tasks.filter((task) => task.completedAt !== null);
  }

  findById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  complete(id: string): Task | null {
    const task = this.findById(id);
    if (!task) return null;
    if (task.completedAt !== null) return null;

    task.completedAt = new Date().toISOString();
    return task;
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  getRandomIncomplete(): Task | null {
    const incomplete = this.getIncomplete();
    if (incomplete.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * incomplete.length);
    return incomplete[randomIndex];
  }
}

export const taskStore = new TaskStore();
