import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { TaskEnum } from '../../../enums/taskEnum';
import { Task } from '../../../types/task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public isReadyToRemove = false;
  public taskToRemove!: Task;
  public tasks$: Observable<Task[]>;
  public currentTaskName$: Observable<string> | null = null;
  constructor(private _store: StoreService) {
    this.currentTaskName$ = this._store.taskStatus;
    this.currentTaskName$ = this._store.taskStatus.pipe(
      switchMap((status) => {
        if (status === TaskEnum.PROGRESS) {
          return of(TaskEnum.PROGRESS_TEXT);
        } else if (status === TaskEnum.URGENT) {
          return of(TaskEnum.URGENT_TEXT);
        } else if (status === TaskEnum.FINISHED) {
          return of(TaskEnum.FINISHED_TEXT);
        } else if (status === TaskEnum.REMOVED) {
          return of(TaskEnum.REMOVED_TEXT);
        } else {
          return of(TaskEnum.PROGRESS_TEXT);
        }
      }),
    );
    this.tasks$ = this._store.taskStatus$.pipe(
      switchMap((status) => {
        return this._store.getTaskList().pipe(
          map((tasks) => {
            if (status === TaskEnum.URGENT) {
              return tasks.filter((task) => task.isUrgentTask);
            } else if (status === TaskEnum.FINISHED) {
              return tasks.filter((task) => task.isFinishedTask);
            } else if (status === TaskEnum.REMOVED) {
              return tasks.filter((task) => task.isRemovedTask);
            } else {
              return tasks.filter(
                (task) => !task.isRemovedTask && !task.isFinishedTask,
              );
            }
          }),
        );
      }),
    );
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
  removeTask(task: Task) {
    this.taskToRemove = task;
    this.isReadyToRemove = !this.isReadyToRemove;
  }
  deleteTask() {
    this.isReadyToRemove = !this.isReadyToRemove;
    this._store.deleteTask(this.taskToRemove);
  }
  finishTask(event: Event, task: Task) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this._store.toggleToFinishAction(task, isChecked);
    // this._store.markTaskAsFinished(task);
  }
  closeModal() {
    this.isReadyToRemove = !this.isReadyToRemove;
  }
}
