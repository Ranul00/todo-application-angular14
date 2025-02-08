import { TASK_STATUS } from './task.enum';

export interface ITask {
  taskId: string;
  title: string;
  description: string;
  status: TASK_STATUS;
  createdOn?: Date;
}
