import { Component, computed, inject, input } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BoardsService } from '../../../main/services/boards.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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

  drop(event: CdkDragDrop<any>) {
    console.log(event);
  }
}
