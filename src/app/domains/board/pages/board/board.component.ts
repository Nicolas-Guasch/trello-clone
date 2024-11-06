import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDragStart,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BoardsService } from '../../../main/services/boards.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { BoardList, ListCard } from '../../models/list-card.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddCardPanelComponent } from '../../components/add-card-panel/add-card-panel.component';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { CardDetailsComponent } from '../../components/card-details/card-details.component';
import { BoardViewComponent } from '../../components/board-view/board-view.component';
import { TableViewComponent } from '../../components/table-view/table-view.component';

type WorkspaceView = 'Board' | 'Table';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    DragDropModule,
    NavbarComponent,
    TaskCardComponent,
    FontAwesomeModule,
    ButtonComponent,
    ReactiveFormsModule,
    AddCardPanelComponent,
    BoardViewComponent,
    TableViewComponent,
  ],
  templateUrl: './board.component.html',
  styles: `
    .listContainer {
      scrollbar-color: #fff6 #00000026;
      scrollbar-width: auto;
    }

    .cardList,
    .sidenav {
      scrollbar-color: #091e4224 #091e420f;
      scrollbar-width: thin;
    }

    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
  `,
})
export class BoardComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  boardId = input.required<string>();
  boardsService = inject(BoardsService);
  board = computed(() => {
    const id = this.boardId();
    return this.boardsService
      .getBoards()()
      .find((board) => board.id === id)!;
  });

  currentView = signal<WorkspaceView>('Board');

  listCreation = signal(false);
  listForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

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
