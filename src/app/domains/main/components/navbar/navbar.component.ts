import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, OverlayModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  profileIsOpen = signal(false);

  handleProfileClick() {
    this.profileIsOpen.update((val) => !val);
  }
}
