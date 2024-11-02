import { Component, input, output } from '@angular/core';
import { boardInfo } from '../../../main/models/boardInfo.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board-menu-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './board-menu-card.component.html',
  styleUrl: './board-menu-card.component.scss',
})
export class BoardMenuCardComponent {
  board = input.required<boardInfo>();
  star = output<string>();
  boardSelected = output<void>();

  faStar = faStar;
}
