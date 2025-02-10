import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/models/task.model';
import { TASK_ACTION } from 'src/app/models/task.enum';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'addTask',
      'markComplete',
      'markDelete',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();
  });

  beforeEach(() => {
    mockTaskService.getTasks.and.returnValue(of([]));
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    const mockTasks: ITask[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1' },
      { id: 2, title: 'Task 2', description: 'Desc 2' },
    ];
    mockTaskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.addedTasks).toEqual(mockTasks);
  });

  it('should handle API failure while fetching tasks', () => {
    spyOn(console, 'log');
    mockTaskService.getTasks.and.returnValue(
      throwError(() => new Error('API failed'))
    );

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('failed to load tasks');
  });

  it('should add a new task and keep only 5 tasks', () => {
    const newTask: ITask = { id: 6, title: 'New Task', description: 'Desc 6' };
    mockTaskService.addTask.and.returnValue(of(newTask));

    component.addedTasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1' },
      { id: 2, title: 'Task 2', description: 'Desc 2' },
      { id: 3, title: 'Task 3', description: 'Desc 3' },
      { id: 4, title: 'Task 4', description: 'Desc 4' },
      { id: 5, title: 'Task 5', description: 'Desc 5' },
    ];

    component.onAddTask({
      title: newTask.title,
      description: newTask.description,
    });

    expect(mockTaskService.addTask).toHaveBeenCalledWith(
      newTask.title,
      newTask.description
    );
    expect(component.addedTasks.length).toBe(5);
    expect(component.addedTasks[0]).toEqual(newTask); // New task is at the top
  });

  it('should mark a task as completed', () => {
    const updatedTasks: ITask[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1' },
    ];
    mockTaskService.markComplete.and.returnValue(
      of({ message: 'Task completed', data: updatedTasks })
    );

    component.markAsComplete(1);

    expect(mockTaskService.markComplete).toHaveBeenCalledWith(1);
    expect(component.addedTasks).toEqual(updatedTasks);
  });

  it('should handle API failure while marking a task as complete', () => {
    spyOn(console, 'log');
    mockTaskService.markComplete.and.returnValue(
      throwError(() => new Error('API failed'))
    );

    component.markAsComplete(1);

    expect(mockTaskService.markComplete).toHaveBeenCalledWith(1);
    expect(console.log).toHaveBeenCalledWith(new Error('API failed'));
  });

  it('should delete a task', () => {
    const updatedTasks: ITask[] = [
      { id: 2, title: 'Task 2', description: 'Desc 2' },
    ];
    mockTaskService.markDelete.and.returnValue(
      of({ message: 'Task deleted', data: updatedTasks })
    );

    component.deleteTask(1);

    expect(mockTaskService.markDelete).toHaveBeenCalledWith(1);
    expect(component.addedTasks).toEqual(updatedTasks);
  });

  it('should handle API failure while deleting a task', () => {
    mockTaskService.markDelete.and.returnValue(
      throwError(() => new Error('API failed'))
    );

    component.deleteTask(1);

    expect(mockTaskService.markDelete).toHaveBeenCalledWith(1);
    expect(console.log).toHaveBeenCalledWith(new Error('API failed'));
  });

  it('should call the appropriate function on mark action event', () => {
    spyOn(component, 'markAsComplete');
    spyOn(component, 'deleteTask');

    component.addedTasks = [{ id: 1, title: 'Task 1', description: 'Desc 1' }];

    component.onMarkAction({ action: TASK_ACTION.COMPLETE, taskId: 1 });
    expect(component.markAsComplete).toHaveBeenCalledWith(1);

    component.onMarkAction({ action: TASK_ACTION.DELETE, taskId: 1 });
    expect(component.deleteTask).toHaveBeenCalledWith(1);
  });
});
