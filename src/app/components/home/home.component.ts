import { TASK_ACTION } from './../../models/task.enum';
import { Component, OnInit } from '@angular/core';
import { TASK_STATUS } from 'src/app/models/task.enum';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  addedTasks: ITask[] = [];

  ngOnInit(): void {}

  onAddTask(event: { taskId: string; title: string; description: string }) {
    const newTask: ITask = {
      ...event,
      status: TASK_STATUS.PENDING,
    };
    this.addedTasks = [...this.addedTasks, newTask];
  }

  onMarkAction(event: { action: TASK_ACTION; taskId: string }) {
    const foundIndex = this.addedTasks.findIndex(
      (item) => item.taskId === event.taskId
    );
    if (foundIndex !== -1) {
      switch (event.action) {
        case TASK_ACTION.COMPLETE:
          this.removeTaskFromTheAddedTasks(foundIndex);
          break;
        case TASK_ACTION.DELETE:
          this.removeTaskFromTheAddedTasks(foundIndex);
          break;
      }
    }
  }

  removeTaskFromTheAddedTasks(foundIndex: number) {
    this.addedTasks.splice(foundIndex, 1);
  }
}
