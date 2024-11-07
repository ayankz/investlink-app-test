import { Component } from '@angular/core';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrl: './search-task.component.scss',
})
export class SearchTaskComponent {
  searchQuery = '';
  findByQuery() {
    console.log(this.searchQuery);
  }
}
