import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { TaskEnum } from '../../../enums/taskEnum';
import { Task } from '../../../types/task';
import { TagService } from '../../../services/tag.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public isReadyToRemove = false;
  public taskToRemove!: Task;
  searchQuery: string = '';
  public tasks$: Observable<Task[]>;
  public currentTaskName$: Observable<string> | null = null;
  constructor(
    private _store: StoreService,
    private tagService: TagService,
  ) {
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
    this.tasks$ = combineLatest([
      this._store.taskStatus$,
      this.tagService.activeTags$, // Assuming tagStatus$ is in navbarService
    ]).pipe(
      switchMap(([status, tagStatus]) => {
        return this._store.getTaskList$().pipe(
          map((tasks) => {
            let filteredTasks = tasks;

            // Filter by task status
            if (status === TaskEnum.URGENT) {
              filteredTasks = filteredTasks.filter(
                (task) => task.isUrgentTask && !task.isFinishedTask,
              );
            } else if (status === TaskEnum.FINISHED) {
              filteredTasks = filteredTasks.filter(
                (task) => task.isFinishedTask,
              );
            } else if (status === TaskEnum.REMOVED) {
              filteredTasks = filteredTasks.filter(
                (task) => task.isRemovedTask,
              );
            } else {
              filteredTasks = filteredTasks.filter(
                (task) => !task.isRemovedTask && !task.isFinishedTask,
              );
            }

            // Additional filter by tag status
            if (tagStatus && tagStatus.length > 0) {
              filteredTasks = filteredTasks.filter(
                (task) =>
                  task.tags && task.tags.some((tag) => tagStatus.includes(tag)),
              );
            }

            return filteredTasks;
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
  }
  searchByQuery(query: string) {
    this.searchQuery = query;
  }
  highlightText(taskName: string): string {
    if (!this.searchQuery) {
      return taskName;
    }
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    return taskName.replace(regex, '<span class="bold">$1</span>');
  }
  closeModal() {
    this.isReadyToRemove = !this.isReadyToRemove;
  }
  openCreatePage() {
    this._store.setIsVisibleCreateComponent(true);
  }
}
