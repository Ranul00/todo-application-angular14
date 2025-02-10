export interface ITask {
  id: number;
  title: string;
  description: string;
}

export interface ITaskResponse {
  message: string;
  data: ITask[];
}
