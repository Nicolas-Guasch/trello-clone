import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  typeButton = input<'button' | 'submit' | 'reset'>('button');
  color = input<'trello' | 'success' | 'danger' | 'warning'>('trello');

  getColor = computed(() => {
    return {
      'bg-trello': this.color() == 'trello',
      'hover:bg-trelloHover': this.color() == 'trello',
      'focus-visible:outline-trelloFocus': this.color() == 'trello',
      'bg-success-700': this.color() == 'success',
      'hover:bg-success-800': this.color() == 'success',
      'focus-visible:outline-success-300': this.color() == 'success',
      'bg-danger-700': this.color() == 'danger',
      'hover:bg-danger-800': this.color() == 'danger',
      'focus-visible:outline-danger-300': this.color() == 'danger',
      'bg-warning-500': this.color() == 'warning',
      'hover:bg-warning-600': this.color() == 'warning',
      'focus-visible:outline-warning-300': this.color() == 'warning',
    };
  });
}
