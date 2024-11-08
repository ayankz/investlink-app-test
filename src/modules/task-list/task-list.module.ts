import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RemoveTaskComponent } from './remove-task/remove-task.component';

@NgModule({
  declarations: [TaskListComponent, RemoveTaskComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [TaskListComponent],
})
export class TaskListModule {}
