import { Component, computed, inject, input, signal } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BoardsService } from '../../../main/services/boards.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faChartSimple,
  faLock,
  faStar,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { BoardList } from '../../models/list-card.model';
import { BoardViewComponent } from '../../components/board-view/board-view.component';
import { TableViewComponent } from '../../components/table-view/table-view.component';
import { OverlayModule } from '@angular/cdk/overlay';

type WorkspaceView = 'Board' | 'Table';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NavbarComponent,
    FontAwesomeModule,
    BoardViewComponent,
    TableViewComponent,
    OverlayModule,
  ],
  templateUrl: './board.component.html',
  styles: `
    .sidenav {
      scrollbar-color: #091e4224 #091e420f;
      scrollbar-width: thin;
    }
  `,
})
export class BoardComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faStar = faStar;
  faLock = faLock;
  faChart = faChartSimple;
  faAngleDown = faAngleDown;
  faX = faX;

  boardId = input.required<string>();
  boardsService = inject(BoardsService);
  board = computed(() => {
    const id = this.boardId();
    return this.boardsService
      .getBoards()()
      .find((board) => board.id === id)!;
  });

  currentView = signal<WorkspaceView>('Board');
  isViewsOpen = signal(false);

  toggleViews() {
    this.isViewsOpen.update((value) => !value);
  }

  setView(view: WorkspaceView) {
    this.currentView.set(view);
    this.isViewsOpen.set(false);
  }

  toDos = signal<BoardList>({
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
      { id: '3', title: 'Task 3' },
    ],
    currentlyAdding: false,
  });
  doing = signal<BoardList>({
    id: '2',
    title: 'Doing',
    cards: [
      { id: '4', title: 'Task 4' },
      { id: '5', title: 'Task 5' },
      { id: '6', title: 'Task 6' },
    ],
    currentlyAdding: false,
  });
  done = signal<BoardList>({
    id: '3',
    title: 'Done',
    cards: [
      { id: '7', title: 'Task 7' },
      { id: '8', title: 'Task 8' },
      { id: '9', title: 'Task 9' },
    ],
    currentlyAdding: false,
  });

  boardLists = signal([this.toDos, this.doing, this.done]);
}
