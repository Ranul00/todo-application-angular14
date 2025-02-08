import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTask: EventEmitter<{
    taskId: string;
    title: string;
    description: string;
  }> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  addTaskFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onAddTask() {
    if (this.addTaskFormGroup.valid) {
      this.addTask.emit({
        taskId: this.generateTaskId(),
        title: this.addTaskFormGroup.controls.title.value || '',
        description: this.addTaskFormGroup.controls.description.value || '',
      });
    }
  }

  generateTaskId(): string {
    return `taskId-${Date.now()}`;
  }
}
