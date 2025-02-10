import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TASK_ACTION } from 'src/app/models/task.enum';
import { ITask } from 'src/app/models/task.model';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle `showFullText` property', () => {
    const task: ITask & { showFullText?: boolean } = {
      id: 1,
      title: 'Task 1',
      description: 'Desc 1',
      showFullText: false,
    };

    component.toggleText(task);
    expect(task.showFullText).toBeTrue();

    component.toggleText(task);
    expect(task.showFullText).toBeFalse();
  });

  it('should emit event when marking a task as complete', () => {
    spyOn(component.markAction, 'emit');

    const task: ITask = { id: 1, title: 'Task 1', description: 'Desc 1' };
    component.onClickDone(task);

    expect(component.markAction.emit).toHaveBeenCalledWith({
      action: TASK_ACTION.COMPLETE,
      taskId: 1,
    });
  });

  it('should emit event when deleting a task', () => {
    spyOn(component.markAction, 'emit');

    const task: ITask = { id: 1, title: 'Task 1', description: 'Desc 1' };
    component.onClickDelete(task);

    expect(component.markAction.emit).toHaveBeenCalledWith({
      action: TASK_ACTION.DELETE,
      taskId: 1,
    });
  });
});
