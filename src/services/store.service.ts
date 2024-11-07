import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
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
    return of(tasks);
  }
  addTask(task: Task) {
    const actualTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    actualTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(actualTasks));
  }
}
