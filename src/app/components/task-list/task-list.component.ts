import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TASK_ACTION } from 'src/app/models/task.enum';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnChanges {
  @Input() addedTasks: (ITask & { showFullText?: boolean })[] = [];
  @Output() markAction: EventEmitter<{ action: TASK_ACTION; taskId: string }> =
    new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['addedTasks']?.currentValue) {
      console.log('changes');
    }
  }

  toggleText(item: ITask & { showFullText?: boolean }) {
    item.showFullText = !item.showFullText;
  }

  onClickDone(task: ITask) {
    this.markAction.emit({
      action: TASK_ACTION.COMPLETE,
      taskId: task.taskId,
    });
  }

  onClickDelete(task: ITask) {
    this.markAction.emit({
      action: TASK_ACTION.DELETE,
      taskId: task.taskId,
    });
  }
}
