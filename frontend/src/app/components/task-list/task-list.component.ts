import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TASK_ACTION } from 'src/app/models/task.enum';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() addedTasks: (ITask & { showFullText?: boolean })[] = [];
  @Output() markAction: EventEmitter<{
    action: TASK_ACTION;
    taskId: number;
  }> = new EventEmitter();

  constructor() {}

  toggleText(item: ITask & { showFullText?: boolean }) {
    item.showFullText = !item.showFullText;
  }

  onClickDone(task: ITask) {
    this.markAction.emit({
      action: TASK_ACTION.COMPLETE,
      taskId: task.id,
    });
  }

  onClickDelete(task: ITask) {
    this.markAction.emit({
      action: TASK_ACTION.DELETE,
      taskId: task.id,
    });
  }
}
