import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrl: './search-task.component.scss',
})
export class SearchTaskComponent {
  searchQuery = '';
  @Output() inputChanges = new EventEmitter();
  findByQuery() {
    this.inputChanges.emit(this.searchQuery);
  }
}
