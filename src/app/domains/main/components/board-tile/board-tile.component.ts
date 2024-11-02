import { Component, computed, inject, input } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board-tile',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './board-tile.component.html',
  styleUrl: './board-tile.component.scss',
})
export class BoardTileComponent {
  faStar = faStar;
  boardService = inject(BoardsService);
  boardId = input.required<string>();
  board = computed(() => {
    const id = this.boardId();
    return this.boardService
      .getBoards()()
      .find((board) => board.id === id)!;
  });

  tileStyles: Record<string, any> = {};

  constructor() {}

  ngOnInit() {
    if (this.board().backgroundColor) {
      this.tileStyles['background-color'] = '#' + this.board().backgroundColor;
    } else if (this.board().backgroundImage) {
      this.tileStyles['background-image'] =
        `url("${this.board().backgroundImage}")`;
    }
  }

  toggleStar() {
    this.boardService.toggleStarred(this.board().id);
  }
}
