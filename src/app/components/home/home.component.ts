import { TaskService } from './../../services/task.service';
import { TASK_ACTION } from './../../models/task.enum';
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  addedTasks: ITask[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.addedTasks = [...res];
      },
      error: () => {
        console.log('failed to load tasks');
      },
    });
  }

  onAddTask(event: { title: string; description: string }) {
    this.taskService.addTask(event.title, event.description).subscribe({
      next: (res) => {
        this.addedTasks.unshift(res);
      },
      error: () => {
        console.log('failed to load tasks');
      },
    });
  }

  onMarkAction(event: { action: TASK_ACTION; taskId: string | number }) {
    const foundIndex = this.addedTasks.findIndex(
      (item) => item.id === event.taskId
    );
    if (foundIndex !== -1) {
      switch (event.action) {
        case TASK_ACTION.COMPLETE:
          this.markAsComplete(event.taskId, foundIndex);
          break;
        case TASK_ACTION.DELETE:
          this.deleteTask(event.taskId, foundIndex);
          break;
      }
    }
  }

  markAsComplete(taskId: string | number, foundIndex: number) {
    this.taskService.markComplete(taskId).subscribe({
      next: (res) => {
        if (res) {
          this.removeTaskFromTheAddedTasks(foundIndex);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteTask(taskId: string | number, foundIndex: number) {
    this.taskService.markDelete(taskId).subscribe({
      next: (res) => {
        if (res) {
          this.removeTaskFromTheAddedTasks(foundIndex);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeTaskFromTheAddedTasks(foundIndex: number) {
    this.addedTasks.splice(foundIndex, 1);
  }
}
