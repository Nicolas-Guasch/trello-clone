import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  typeButton = input<'button' | 'submit' | 'reset'>('button');
  color = input<keyof typeof this.mapColors>('trello');

  mapColors = {
    trello: {
      'text-white': true,
      'bg-trello': true,
      'hover:bg-trelloHover': true,
      'focus-visible:outline-trelloFocus': true,
    },
    success: {
      'text-white': true,
      'bg-success-700': true,
      'hover:bg-success-800': true,
      'focus-visible:outline-success-300': true,
    },
    danger: {
      'text-white': true,
      'bg-danger-700': true,
      'hover:bg-danger-800': true,
      'focus-visible:outline-danger-300': true,
    },
    warning: {
      'text-white': true,
      'bg-warning-500': true,
      'hover:bg-warning-600': true,
      'focus-visible:outline-warning-300': true,
    },
    neutral: {
      'focus-visible:outline-trelloFocus': true,
      'bg-trelloBgNeutral': true,
      'hover:bg-trelloBgNeutralHover': true,
    },
    transparent: {
      'text-white': true,
      'bg-white/20': true,
      'hover:bg-white/35': true,
    },
  };

  getColor = computed(() => {
    return this.mapColors[this.color()];
  });
}
