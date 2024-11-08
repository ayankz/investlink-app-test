import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskModule } from '../create-task/create-task.module';
import { RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage,
    CreateTaskModule,
    RouterLinkActive,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
