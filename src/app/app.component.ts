import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLinkComponent } from '../shared/components/nav-link/nav-link.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavLinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'inveslink-app-test';
}
