import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
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
  ],
  templateUrl: './board.component.html',
  styles: `
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
  faPlus = faPlus;
  faX = faX;

  boardId = input.required<string>();
  boardsService = inject(BoardsService);
  board = computed(() => {
    const id = this.boardId();
    return this.boardsService
      .getBoards()()
      .find((board) => board.id === id)!;
  });

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
  });
  doing = signal<BoardList>({
    id: '2',
    title: 'Doing',
    cards: [
      { id: '4', title: 'Task 4' },
      { id: '5', title: 'Task 5' },
      { id: '6', title: 'Task 6' },
    ],
  });
  done = signal<BoardList>({
    id: '3',
    title: 'Done',
    cards: [
      { id: '7', title: 'Task 7' },
      { id: '8', title: 'Task 8' },
      { id: '9', title: 'Task 9' },
    ],
  });

  boardLists = signal([this.toDos, this.doing, this.done]);

  toggleListCreation() {
    if (this.listCreation()) {
      this.listForm.reset();
    }
    this.listCreation.update((value) => !value);
  }

  addList() {
    if (this.listForm.valid) {
      this.boardLists.update((board) => [
        ...board,
        signal({
          id: Date.now().toString(),
          title: this.listForm.get('title')?.value!,
          cards: [],
        }),
      ]);
      this.listForm.reset();
      this.listCreation.set(false);
    }
  }

  drop(event: CdkDragDrop<BoardList>) {
    if (event.previousContainer === event.container) {
      const list = this.boardLists().find(
        (list) => list() === event.container.data,
      );
      list?.update((list) => {
        moveItemInArray(list.cards, event.previousIndex, event.currentIndex);
        return { ...list, cards: [...list.cards] };
      });
    } else {
      const previousList = this.boardLists().find(
        (list) => list() === event.previousContainer.data,
      );
      const list = this.boardLists().find(
        (list) => list() === event.container.data,
      );
      let previous = [...event.previousContainer.data.cards];
      let current = [...event.container.data.cards];
      transferArrayItem(
        previous,
        current,
        event.previousIndex,
        event.currentIndex,
      );
      previousList?.update((list) => ({ ...list, cards: previous }));
      list?.update((list) => ({ ...list, cards: current }));
    }
  }

  offset = { x: 0, y: 0 };
  onDragStart(event: CdkDragStart<ListCard>, id: string): void {
    if (document.querySelector('#card' + id)) {
      const card = new ElementRef<HTMLDivElement>(
        document.querySelector('#card' + id)!,
      );
      if (event.event instanceof MouseEvent) {
        const mouseEvent: MouseEvent = event.event;
        const cardX =
          window.scrollX + card.nativeElement.getBoundingClientRect().left;
        const cardY =
          window.scrollY + card.nativeElement.getBoundingClientRect().top;
        this.offset = {
          x: mouseEvent.clientX - cardX,
          y: mouseEvent.clientY - cardY,
        };

        this.offsetPreview(
          { x: mouseEvent.clientX, y: mouseEvent.clientY },
          id,
        );
      } else {
        this.offset = { x: 0, y: 0 };
      }
    }
  }

  offsetPreview(position: { x: number; y: number }, id: string) {
    if (document.querySelector('#preview' + id)) {
      const cardPreview = new ElementRef<HTMLLIElement>(
        document.querySelector('#preview' + id)!,
      );
      const xPos = position.x - this.offset.x;
      const yPos = position.y - this.offset.y;
      cardPreview.nativeElement.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }

  onDragMove(event: CdkDragMove<ListCard>, id: string): void {
    this.offsetPreview(
      { x: event.pointerPosition.x, y: event.pointerPosition.y },
      id,
    );
  }
}
