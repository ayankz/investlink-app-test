import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public _taskStatus = new BehaviorSubject('process');
  public taskStatus$ = this._taskStatus.asObservable();
  public _isVisibleCreateComponent = new BehaviorSubject<boolean>(false);
  public isVisibleCreateComponent$ =
    this._isVisibleCreateComponent.asObservable();
  get taskStatus() {
    return this.taskStatus$;
  }
  get isVisibleCreateComponent() {
    return this.isVisibleCreateComponent$;
  }
  setNewStatus(newValue: string) {
    this._taskStatus.next(newValue);
  }
  setIsVisibleCreateComponent(newValue: boolean) {
    this._isVisibleCreateComponent.next(newValue);
  }
  getTaskList(): Observable<Task[]> {
    const data = localStorage.getItem('tasks');
    const tasks = data ? JSON.parse(data) : [];
    this.activeTasks$.next(tasks);
    return this.activeTasks$ as Observable<Task[]>;
  }
  addTask(task: Task) {
    const actualTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    actualTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(actualTasks));
    this.getTaskList().subscribe(console.log);
  }
  deleteTask(task: Task) {
    const actualTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = actualTasks.filter(
      (item: Task) => item.name !== task.name,
    );
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  }
}
