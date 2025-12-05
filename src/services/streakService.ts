import { taskStore } from './taskStore';

export interface StreakData {
  currentStreak: number;
  lastCompletionDate: string | null;
}

export interface StatsData {
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  completionRate: number;
  currentStreak: number;
}

class StreakService {
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffTime = d1.getTime() - d2.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateStreak(): StreakData {
    const completed = taskStore.getCompleted();

    if (completed.length === 0) {
      return { currentStreak: 0, lastCompletionDate: null };
    }

    const completionDates = completed
      .map((task) => new Date(task.completedAt!))
      .sort((a, b) => b.getTime() - a.getTime());

    const lastCompletion = completionDates[0];
    const today = new Date();

    const daysDiff = this.getDaysDifference(today, lastCompletion);

    if (daysDiff > 1) {
      return { currentStreak: 0, lastCompletionDate: lastCompletion.toISOString() };
    }

    const uniqueDays = new Set<string>();
    for (const date of completionDates) {
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      uniqueDays.add(dateKey);
    }

    const sortedUniqueDays = Array.from(uniqueDays)
      .map((key) => {
        const [year, month, day] = key.split('-').map(Number);
        return new Date(year, month, day);
      })
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 1;
    let currentDate = sortedUniqueDays[0];

    for (let i = 1; i < sortedUniqueDays.length; i++) {
      const prevDate = sortedUniqueDays[i];
      const diff = this.getDaysDifference(currentDate, prevDate);

      if (diff === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }

    return {
      currentStreak: streak,
      lastCompletionDate: lastCompletion.toISOString(),
    };
  }

  getStats(): StatsData {
    const allTasks = taskStore.getAll();
    const completed = taskStore.getCompleted();
    const incomplete = taskStore.getIncomplete();

    const totalTasks = allTasks.length;
    const completedTasks = completed.length;
    const incompleteTasks = incomplete.length;

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100 * 100) / 100 : 0;

    const { currentStreak } = this.calculateStreak();

    return {
      totalTasks,
      completedTasks,
      incompleteTasks,
      completionRate,
      currentStreak,
    };
  }
}

export const streakService = new StreakService();
