import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Task } from '../types/task';
import { TagService } from './tag.service';
import { TaskEnum } from '../enums/taskEnum';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public taskStatus$ = new BehaviorSubject('process');
  public _isVisibleCreateComponent = new BehaviorSubject<boolean>(false);
  public isVisibleCreateComponent$ =
    this._isVisibleCreateComponent.asObservable();
  constructor(private tagService: TagService) {
    this.getFilteredTasks$().subscribe((filteredTasks) => {
      this.activeTasks$.next(filteredTasks);
    });
  }

  get taskStatus() {
    return this.taskStatus$.asObservable();
  }
  get isVisibleCreateComponent() {
    return this.isVisibleCreateComponent$;
  }
  changeStatus(newValue: string) {
    this.taskStatus$.next(newValue);
  }
  setIsVisibleCreateComponent(newValue: boolean) {
    this._isVisibleCreateComponent.next(newValue);
  }
  getTaskList$(): Observable<Task[]> {
    const data = localStorage.getItem('tasks');
    const tasks = data ? JSON.parse(data) : [];
    this.activeTasks$.next(tasks);
    return this.activeTasks$.asObservable();
  }
  private getFilteredTasks$(): Observable<Task[]> {
    return this.taskStatus$.pipe(
      switchMap((status) =>
        this.getTaskList$().pipe(
          map((tasks) => {
            if (status === TaskEnum.URGENT) {
              return tasks.filter(
                (task) => task.isUrgentTask && !task.isFinishedTask,
              );
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
        ),
      ),
    );
  }
  gatTaskListFromStorage() {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }
  addTask(task: Task) {
    const actualTasks = this.gatTaskListFromStorage();
    actualTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(actualTasks));
    this.getTaskList$();
  }
  deleteTask(task: Task) {
    try {
      const actualTasks = this.gatTaskListFromStorage();
      const mappedList = actualTasks.map((item: Task) => {
        if (item.name === task.name) {
          return {
            ...item,
            isRemovedTask: true,
            isUrgentTask: false,
            isFinishedTask: false,
          };
        }
        return item;
      });
      localStorage.setItem('tasks', JSON.stringify(mappedList));
      this.getTaskList$();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  }
  toggleToFinishAction(task: Task, isFinished: boolean) {
    const actualTasks = this.gatTaskListFromStorage();
    const modifiedList = actualTasks.map((item: Task) => {
      if (item.name === task.name) {
        return {
          ...item,
          isFinishedTask: isFinished,
          // isUrgentTask: !isFinished,
        };
      }
      return item;
    });
    localStorage.setItem('tasks', JSON.stringify(modifiedList));
    this.getTaskList$();
  }
  filterTasksByTag() {
    return combineLatest([
      this.tagService.activeTags$, // Observable<number>
      this.activeTasks$, // Observable<number[]>
    ])
      .pipe(
        map(([activeTags, tasks]) => {
          const filteredTasks =
            activeTags.length > 0
              ? tasks.filter((task) =>
                  task.tags.some((tag) => activeTags.includes(tag)),
                )
              : tasks;
          this.activeTasks$.next(filteredTasks);
          return tasks;
        }),
      )
      .subscribe();
  }
}
