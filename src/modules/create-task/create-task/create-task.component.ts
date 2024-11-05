import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  constructor(private storeService: StoreService) {}

  onClose() {
    this.storeService._isVisibleCreateComponent.next(false);
  }
}
