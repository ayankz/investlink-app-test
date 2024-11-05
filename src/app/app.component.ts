import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarModule } from '../modules/navbar/navbar.module';
import { CreateTaskModule } from '../modules/create-task/create-task.module';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule, CreateTaskModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isVisibleCreatePage: Observable<boolean>;
  constructor(private service: StoreService) {
    this.isVisibleCreatePage = this.service.isVisibleCreateComponent$;
  }
  title = 'inveslink-app-test';
}
