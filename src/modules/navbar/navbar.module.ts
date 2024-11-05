import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskModule } from '../create-task/create-task.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, SharedModule, NgOptimizedImage, CreateTaskModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
