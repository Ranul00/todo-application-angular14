import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output() addTask: EventEmitter<{
    title: string;
    description: string;
  }> = new EventEmitter();
  constructor() {}

  addTaskFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onAddTask() {
    if (this.addTaskFormGroup.valid) {
      this.addTask.emit({
        title: this.addTaskFormGroup.controls.title.value ?? '',
        description: this.addTaskFormGroup.controls.description.value ?? '',
      });

      this.addTaskFormGroup.reset();
    }
  }
}
