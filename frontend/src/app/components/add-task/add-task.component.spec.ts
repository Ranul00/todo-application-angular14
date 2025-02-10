import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.addTaskFormGroup.value).toEqual({
      title: '',
      description: '',
    });
  });

  it('should mark the form as invalid if title is empty', () => {
    component.addTaskFormGroup.controls.title.setValue('');
    expect(component.addTaskFormGroup.valid).toBeFalsy();
  });

  it('should emit the task when form is valid and submitted', () => {
    spyOn(component.addTask, 'emit');

    component.addTaskFormGroup.controls.title.setValue('Test Task');
    component.addTaskFormGroup.controls.description.setValue(
      'Test Description'
    );

    component.onAddTask();

    expect(component.addTask.emit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
    });
  });

  it('should reset the form after submitting a valid task', () => {
    component.addTaskFormGroup.controls.title.setValue('Sample Task');
    component.addTaskFormGroup.controls.description.setValue(
      'Sample Description'
    );

    component.onAddTask();

    expect(component.addTaskFormGroup.value).toEqual({
      title: null,
      description: null,
    });
  });
});
