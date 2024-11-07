import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SearchTaskComponent } from './components/search-task/search-task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent, SearchTaskComponent],
  imports: [CommonModule, FormsModule],
  exports: [ButtonComponent, SearchTaskComponent],
})
export class SharedModule {}
