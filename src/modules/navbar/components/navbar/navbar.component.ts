import { Component } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { TaskType } from '../../../../types/task-type';
import { Tag } from '../../../../types/tag';
import { TagService } from '../../../../services/tag.service';
import { Observable } from 'rxjs';

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
  tags$: Observable<Tag[]> | null = null;
  public activeItem: any = this.items[0];
  public activeTags$: Observable<string[]>;
  constructor(
    private _store: StoreService,
    private tagService: TagService,
  ) {
    this.tags$ = this.tagService.tags;
    this.activeTags$ = this.tagService.activeTags$;
  }
  onItemClick(item: any) {
    this.activeItem = item;
    this._store.changeStatus(item.status);
  }
  filterByTag(currentTag: string) {
    this.tagService.setActiveTag(currentTag);
  }

  onCreate() {
    this._store.setIsVisibleCreateComponent(true);
  }
}
