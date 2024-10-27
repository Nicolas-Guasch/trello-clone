import { Component, computed, inject, Signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BoardsService } from '../../services/boards.service';
import { boardInfo } from '../../models/boardInfo.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { BoardTileComponent } from '../board-tile/board-tile.component';

@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule, BoardTileComponent],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss',
})
export class AllBoardsComponent {
  faTrello = faTrello;
  faClock = faClock;
  faStar = faStar;

  boardsService = inject(BoardsService);
  boards: Signal<boardInfo[]> = this.boardsService.getBoards();

  starredBoards = computed(() => {
    const boards = this.boards();
    return boards.filter((board) => board.starred);
  });

  recentBoards = computed(() => {
    let sortedBoards = [...this.boards()].filter((board) => !board.starred);
    return sortedBoards.sort((a: boardInfo, b: boardInfo) => {
      const ageA = Date.parse(a.lastOpened),
        ageB = Date.parse(b.lastOpened);
      return ageB - ageA;
    });
  });

  allBoards = computed(() => {
    let sortedBoards = [...this.boards()];
    return sortedBoards.sort((a: boardInfo, b: boardInfo) => {
      if (a.title === b.title) return 0;
      return a.title < b.title ? -1 : 1;
    });
  });
}
