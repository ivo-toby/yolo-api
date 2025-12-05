export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  difficulty?: Difficulty;
}
