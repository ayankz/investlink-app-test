import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Observable, of, switchMap } from 'rxjs';
import { TaskEnum } from '../../../enums/taskEnum';
import { Task } from '../../../types/task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public tasks$: Observable<Task[]>;
  public currentTaskName: Observable<string> | null = null;
  constructor(private _store: StoreService) {
    this.currentTaskName = this._store.taskStatus;
    this.currentTaskName = this._store.taskStatus.pipe(
      switchMap((status) => {
        if (status === TaskEnum.PROGRESS) {
          return of(TaskEnum.PROGRESS_TEXT);
        } else if (status === TaskEnum.URGENT) {
          return of(TaskEnum.URGENT_TEXT);
        } else if (status === TaskEnum.FINISHED) {
          return of(TaskEnum.FINISHED_TEXT);
        } else {
          return of(TaskEnum.REMOVED_TEXT);
        }
      }),
    );
    this.tasks$ = this._store.getTaskList();
    this.tasks$.subscribe(console.log);
  }
  getClassByTagName(tag: string) {
    switch (tag) {
      case 'Продуктивность':
        return 'tag-name tag-name__violet';
      case 'Образование':
        return 'tag-name tag-name__green';
      case 'Здоровье':
        return 'tag-name tag-name__orange';
      default:
        return 'tag-name tag-name__red';
    }
  }
}
