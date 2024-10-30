import { Component, input, output } from '@angular/core';
import { boardInfo } from '../../models/boardInfo.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-menu-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './board-menu-card.component.html',
  styleUrl: './board-menu-card.component.scss',
})
export class BoardMenuCardComponent {
  board = input.required<boardInfo>();
  star = output<string>();

  faStar = faStar;
}
