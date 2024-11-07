import { Routes } from '@angular/router';

import { LoginComponent } from './domains/login/pages/login/login.component';
import { BoardsComponent } from './domains/main/pages/boards/boards.component';
import { BoardComponent } from './domains/board/pages/board/board.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'b/:boardId', component: BoardComponent },
  { path: '', redirectTo: '/boards', pathMatch: 'full' },
];
