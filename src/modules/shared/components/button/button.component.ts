import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() className = 'button__primary';
  @Input() title = 'Новая задача';
  @Output() buttonClick = new EventEmitter();
  emitter() {
    this.buttonClick.emit();
  }
}
