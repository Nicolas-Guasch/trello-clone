import { Injectable, signal } from '@angular/core';
import { boardInfo } from '../models/boardInfo.models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private boards = signal<boardInfo[]>([
    {
      id: Date.now().toString(),
      title: 'My first board',
      backgroundColor: '0079BF',
      lastOpened: Date.now().toString(),
      starred: true,
    },
    {
      id: (Date.now() + 1).toString(),
      title: 'Second one',
      backgroundColor: '519839',
      lastOpened: (Date.now() + 1).toString(),
      starred: false,
    },
    {
      id: (Date.now() + 2).toString(),
      title: 'Third',
      backgroundColor: '0079BF',
      backgroundImage: 'images/board/boardbg1.webp',
      lastOpened: (Date.now() + 2).toString(),
      starred: false,
    },
    {
      id: (Date.now() + 3).toString(),
      title: 'Fourth',
      backgroundImage: 'images/board/boardbg1.webp',
      lastOpened: (Date.now() + 3).toString(),
      starred: false,
    },
    {
      id: (Date.now() + 4).toString(),
      title: 'Last one',
      backgroundColor: '0079BF',
      backgroundImage: 'images/board/boardbg1.webp',
      lastOpened: (Date.now() + 4).toString(),
      starred: false,
    },
  ]);

  constructor() {}

  getBoards() {
    return this.boards.asReadonly();
  }

  addBoard(newBoard: boardInfo) {
    this.boards.update((list) => [...list, newBoard]);
  }
}
