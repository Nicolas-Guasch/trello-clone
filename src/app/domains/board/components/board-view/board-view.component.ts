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
@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [
    DragDropModule,
    NavbarComponent,
    TaskCardComponent,
    FontAwesomeModule,
    ButtonComponent,
    ReactiveFormsModule,
    AddCardPanelComponent,
  ],
  templateUrl: './board-view.component.html',
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
export class BoardViewComponent {
  faPlus = faPlus;
  faX = faX;
  faTrello = faTrello;

  listCreation = signal(false);
  listForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  boardLists = input.required<WritableSignal<WritableSignal<BoardList>[]>>();

  dialog = inject(Dialog);

  titleInput = viewChild<ElementRef<HTMLTextAreaElement>>('titleInput');
  constructor() {
    effect(() => {
      const input = this.titleInput();
      if (input) {
        input.nativeElement.focus();
      }
    });
  }

  toggleListCreation() {
    if (this.listCreation()) {
      this.listForm.reset();
    }
    this.listCreation.update((value) => !value);
  }

  toggleAddCard(index: number) {
    const list = this.boardLists()()[index];
    list.update((list) => ({
      ...list,
      currentlyAdding: !list.currentlyAdding,
    }));
  }

  addList() {
    if (this.listForm.valid) {
      this.boardLists().update((board) => [
        ...board,
        signal({
          id: Date.now().toString(),
          title: this.listForm.get('title')?.value!,
          cards: [],
          currentlyAdding: false,
        }),
      ]);
      this.listForm.reset();
      this.listCreation.set(false);
    }
  }

  dropList(event: CdkDragDrop<WritableSignal<BoardList>[]>) {
    this.boardLists().update((list) => {
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      return [...list];
    });
  }

  drop(event: CdkDragDrop<BoardList>) {
    if (event.previousContainer === event.container) {
      const list = this.boardLists()().find(
        (list) => list() === event.container.data,
      );
      list?.update((list) => {
        moveItemInArray(list.cards, event.previousIndex, event.currentIndex);
        return { ...list, cards: [...list.cards] };
      });
    } else {
      const previousList = this.boardLists()().find(
        (list) => list() === event.previousContainer.data,
      );
      const list = this.boardLists()().find(
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

  openDialog(card: ListCard, list: WritableSignal<BoardList>) {
    this.dialog.open(CardDetailsComponent, {
      minHeight: '600px',
      width: '780px',
      data: { card: card, list: list },
    });
  }
}
