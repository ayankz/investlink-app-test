import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  _taskStatus = signal('process');
  _isVisibleCreateComponent = new BehaviorSubject<boolean>(false);
  public isVisibleCreateComponent$ =
    this._isVisibleCreateComponent.asObservable();
  get taskStatus() {
    return this._taskStatus();
  }
  get isVisibleCreateComponent() {
    return this.isVisibleCreateComponent$;
  }
  setNewStatus(newValue: string) {
    this._taskStatus.set(newValue);
  }
  setIsVisibleCreateComponent(newValue: boolean) {
    this._isVisibleCreateComponent.next(newValue);
  }
}
