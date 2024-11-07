export interface Task {
  name: string;
  description: string;
  deadline: string;
  isUrgentTask: boolean;
  isFinishedTask: boolean;
  isRemovedTask: boolean;
  tags: string[];
}
