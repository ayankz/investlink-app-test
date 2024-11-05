import { Component } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Task } from '../../types/task';
import { Tag } from '../../types/tag';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items: Task[] = [
    { icon: 'mail', label: 'Мои задачи', status: 'progress' },
    { icon: 'star', label: 'Важные', status: 'urgent' },
    { icon: 'done', label: 'Выполненные', status: 'finished' },
    { icon: 'basket', label: 'Удаленные', status: 'removed' },
  ];
  tags: Tag[] = [
    {
      label: 'Продуктивность',
      className: 'circle__violet',
    },
    {
      label: 'Образование',
      className: 'circle__green',
    },
    {
      label: 'Здоровье',
      className: 'circle__orange',
    },
    {
      label: 'Срочно',
      className: 'circle__red',
    },
  ];
  constructor(private storeService: StoreService) {}
  onItemClick(status: string) {
    this.storeService.setNewStatus(status);
    console.log(this.storeService._taskStatus());
  }
  onCreate() {
    this.storeService.setIsVisibleCreateComponent(true);
    // console.log(this.storeService.isVisibleCreateComponent());
  }
}
