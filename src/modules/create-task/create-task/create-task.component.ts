import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  public tags = ['Продуктивность', 'Здоровье', 'Образование', 'Срочно'];
  public taskForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isUrgentTask: new FormControl(false, [Validators.required]),
    isFinishedTask: new FormControl(false),
    isRemovedTask: new FormControl(false),
    description: new FormControl(''),
    deadline: new FormControl('', [Validators.required]),
    tags: new FormArray([], [Validators.required]),
  });
  constructor(
    private storeService: StoreService,
    private fb: FormBuilder,
  ) {}

  onClose() {
    this.storeService._isVisibleCreateComponent.next(false);
  }
  get tagsArray(): FormArray {
    return this.taskForm.get('tags') as FormArray;
  }
  onTagChange(event: Event, tag: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.tagsArray.push(new FormControl(tag));
    } else {
      const index = this.tagsArray.controls.findIndex((x) => x.value === tag);
      if (index !== -1) {
        this.tagsArray.removeAt(index);
      }
    }
  }
  openCalendar() {
    console.log('Open custom calendar');
  }
  onSubmit() {
    this.storeService.addTask(this.taskForm.getRawValue());
    this.taskForm.reset();
    this.storeService.setIsVisibleCreateComponent(false);
  }
}
