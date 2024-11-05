import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateTaskComponent],
  imports: [CommonModule, SharedModule],
  exports: [CreateTaskComponent],
})
export class CreateTaskModule {}
