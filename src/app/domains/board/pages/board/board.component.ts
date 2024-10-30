import { Component, computed, inject, input } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BoardsService } from '../../../main/services/boards.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  boardId = input.required<string>();
  boardsService = inject(BoardsService);
  board = computed(() => {
    const id = this.boardId();
    console.log(id);
    console.log(this.boardsService.getBoards()());
    return this.boardsService
      .getBoards()()
      .find((board) => board.id === id)!;
  });
}
