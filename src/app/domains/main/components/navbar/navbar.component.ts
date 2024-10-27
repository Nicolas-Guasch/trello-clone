import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faQuestionCircle,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonComponent,
    OverlayModule,
    AccountMenuComponent,
    FontAwesomeModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  profileIsOpen = signal(false);

  faBell = faBell;
  faQuestionCircle = faQuestionCircle;
  faAngleDown = faAngleDown;

  dropdownMenus = ['workspaces', 'recent', 'starred', 'templates'];

  handleProfileClick() {
    this.profileIsOpen.update((val) => !val);
  }
}
