import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AllBoardsComponent } from '../../components/all-boards/all-boards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [
    NavbarComponent,
    AllBoardsComponent,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
  ],
  templateUrl: './boards.component.html',
  styles: `
    .selected {
      color: #0c66e4;
      background-color: #e9f2ff;
    }
  `,
})
export class BoardsComponent {
  faTrello = faTrello;
  faHome = faHome;
}
