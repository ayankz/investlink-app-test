import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public taskStatus$ = new BehaviorSubject('process');
  public _isVisibleCreateComponent = new BehaviorSubject<boolean>(false);
  public isVisibleCreateComponent$ =
    this._isVisibleCreateComponent.asObservable();
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
  getTaskList(): Observable<Task[]> {
    const data = localStorage.getItem('tasks');
    const tasks = data ? JSON.parse(data) : [];
    this.activeTasks$.next(tasks);
    return this.activeTasks$.asObservable();
  }
  addTask(task: Task) {
    const actualTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    actualTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(actualTasks));
  }
  deleteTask(task: Task) {
    try {
      const actualTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
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
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  }
}
