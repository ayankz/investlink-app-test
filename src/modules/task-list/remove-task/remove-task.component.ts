import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../types/task';

@Component({
  selector: 'app-remove-task',
  templateUrl: './remove-task.component.html',
  styleUrl: './remove-task.component.scss',
})
export class RemoveTaskComponent {
  @Input() innerTask!: Task;
  @Output() removeTask = new EventEmitter();
  @Output() close = new EventEmitter();
  onRemoveTask() {
    this.removeTask.emit();
  }
  closeModal() {
    this.close.emit();
  }
}
