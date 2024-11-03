import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  typeButton = input<'button' | 'submit' | 'reset'>('button');
  color = input<
    'trello' | 'success' | 'danger' | 'warning' | 'neutral' | 'transparent'
  >('trello');

  getColor = computed(() => {
    return {
      'text-white':
        this.color() == 'trello' ||
        this.color() == 'success' ||
        this.color() == 'danger' ||
        this.color() == 'warning' ||
        this.color() == 'transparent',
      'bg-trello': this.color() == 'trello',
      'hover:bg-trelloHover': this.color() == 'trello',
      'focus-visible:outline-trelloFocus':
        this.color() == 'trello' || this.color() == 'neutral',
      'bg-success-700': this.color() == 'success',
      'hover:bg-success-800': this.color() == 'success',
      'focus-visible:outline-success-300': this.color() == 'success',
      'bg-danger-700': this.color() == 'danger',
      'hover:bg-danger-800': this.color() == 'danger',
      'focus-visible:outline-danger-300': this.color() == 'danger',
      'bg-warning-500': this.color() == 'warning',
      'hover:bg-warning-600': this.color() == 'warning',
      'focus-visible:outline-warning-300': this.color() == 'warning',
      'bg-trelloBgNeutral': this.color() == 'neutral',
      'hover:bg-trelloBgNeutralHover': this.color() == 'neutral',
      'bg-white/20': this.color() == 'transparent',
      'hover:bg-white/35': this.color() == 'transparent',
    };
  });
}
