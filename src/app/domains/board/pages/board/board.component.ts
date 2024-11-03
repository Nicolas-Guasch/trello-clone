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
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BoardsService } from '../../../main/services/boards.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ListCard } from '../../models/list-card.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    DragDropModule,
    NavbarComponent,
    TaskCardComponent,
    FontAwesomeModule,
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

  boardId = input.required<string>();
  boardsService = inject(BoardsService);
  board = computed(() => {
    const id = this.boardId();
    return this.boardsService
      .getBoards()()
      .find((board) => board.id === id)!;
  });

  toDos = signal<ListCard[]>([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' },
  ]);

  drop(event: CdkDragDrop<any>) {
    this.toDos.update((cards) => {
      moveItemInArray(cards, event.previousIndex, event.currentIndex);
      return [...cards];
    });
  }

  offset = { x: 0, y: 0 };
  onDragStart(event: CdkDragStart<HTMLLIElement>, id: string): void {
    if (document.querySelector('#' + id)) {
      const card = new ElementRef<HTMLLIElement>(
        document.querySelector('#' + id)!,
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
      } else {
        this.offset = { x: 0, y: 0 };
      }
    }
  }

  onDragMove(event: CdkDragMove<HTMLLIElement>, id: string): void {
    if (document.querySelector('#' + id)) {
      const cardPreview = new ElementRef<HTMLLIElement>(
        document.querySelector('#' + id)!,
      );
      const xPos = event.pointerPosition.x - this.offset.x;
      const yPos = event.pointerPosition.y - this.offset.y;
      cardPreview.nativeElement.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }
}
