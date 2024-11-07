import { Component } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { TaskType } from '../../../../types/task-type';
import { Tag } from '../../../../types/tag';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items: TaskType[] = [
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
  }
  onCreate() {
    this.storeService.setIsVisibleCreateComponent(true);
  }
}
