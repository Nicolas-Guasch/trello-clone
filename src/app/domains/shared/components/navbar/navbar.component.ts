import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Signal,
  signal,
  viewChildren,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faQuestionCircle,
  faAngleDown,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '../../../main/services/boards.service';
import { menuOverlay } from '../../models/menuOverlay.model';
import { BoardMenuCardComponent } from '../../components/board-menu-card/board-menu-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonComponent,
    CdkPortal,
    OverlayModule,
    AccountMenuComponent,
    FontAwesomeModule,
    BoardMenuCardComponent,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  boardsService = inject(BoardsService);
  overlay = inject(Overlay);
  darkTheme = input<boolean>(false);
  boards = this.boardsService.getBoards();
  recentBoards = computed(() => {
    const boards = [...this.boards()];
    return boards.sort((a, b) => {
      const dateA = Date.parse(a.lastOpened),
        dateB = Date.parse(b.lastOpened);
      return dateB - dateA;
    });
  });
  starredBoards = computed(() => {
    const boards = this.boards();
    return boards.filter((board) => board.starred);
  });
  profileIsOpen = signal(false);

  faBell = faBell;
  faQuestionCircle = faQuestionCircle;
  faAngleDown = faAngleDown;
  faStar = faStar;

  dropdownMenuLabels = ['workspaces', 'recent', 'starred', 'templates'];
  justClosedMenu: string | null = null;
  lastClickEvent: Event | null = null;
  menuButtons = viewChildren<ElementRef>('menuButton');
  contentPortals = viewChildren(CdkPortal);
  menuOverlays: Record<string, menuOverlay> = {
    workspaces: { isOpen: signal(false) },
    recent: { isOpen: signal(false) },
    starred: { isOpen: signal(false) },
    templates: { isOpen: signal(false) },
    more: { isOpen: signal(false) },
  };

  ngAfterViewInit() {
    for (let [i, menu] of [
      'workspaces',
      'recent',
      'starred',
      'templates',
      'more',
    ].entries()) {
      this.menuOverlays[menu] = {
        isOpen: signal(false),
        content: this.contentPortals()[i],
        overlayRef: null,
        button: this.menuButtons()[i].nativeElement,
      };
    }
  }

  handleProfileClick() {
    this.profileIsOpen.update((val) => !val);
  }

  toggleStar(id: string) {
    this.boardsService.toggleStarred(id);
  }

  showDropdown(menuLabel: string, event: Event) {
    const menu = this.menuOverlays[menuLabel];
    console.log(menu.isOpen());
    if (this.justClosedMenu === menuLabel && this.lastClickEvent == event) {
      console.log('hiding');
      this.justClosedMenu = null;
    } else {
      menu.overlayRef = this.overlay.create(
        this.getOverlayConfig(this.menuOverlays[menuLabel].button!),
      );
      menu.overlayRef.attach(menu.content);
      menu.overlayRef.outsidePointerEvents().subscribe({
        next: (click) => {
          //click.stopPropagation();
          this.hideDropdown(menuLabel, click);
        },
      });
      menu.isOpen.set(true);
      console.log('opening');
      console.log(menu.isOpen());
    }
    this.lastClickEvent = event;
  }

  hideDropdown(menuLabel: string, event: Event | null = null) {
    const menu = this.menuOverlays[menuLabel];
    menu.overlayRef?.detach();
    menu.isOpen.set(false);
    this.justClosedMenu = menuLabel;
    this.lastClickEvent = event;
    console.log('closed!');
  }

  getOverlayConfig(origin: HTMLButtonElement): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 12,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.noop();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      //hasBackdrop: true,
      //backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
