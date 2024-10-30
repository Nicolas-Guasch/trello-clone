import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AllBoardsComponent } from '../../components/all-boards/all-boards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faBox,
  faWaveSquare,
  faAngleDown,
  faAngleUp,
  faHeart,
  faTableCellsLarge,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [
    NavbarComponent,
    AllBoardsComponent,
    RouterLink,
    CdkAccordionModule,
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
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHeart = faHeart;
  faTableCellsLarge = faTableCellsLarge;
  faUsers = faUsers;
  faGear = faGear;
}
