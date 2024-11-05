import { Component, inject, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faArrowRight,
  faBoxArchive,
  faCheck,
  faClock,
  faCopy,
  faKeyboard,
  faPaperclip,
  faPenClip,
  faRectangleList,
  faShare,
  faShareAlt,
  faTag,
  faUser,
  faUserPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkDialogContainer,
  DIALOG_DATA,
  DialogModule,
  DialogRef,
} from '@angular/cdk/dialog';
import { BoardList, ListCard } from '../../models/list-card.model';

interface DialogInputData {
  card: ListCard;
  list: WritableSignal<BoardList>;
}

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card-details.component.html',
})
export class CardDetailsComponent {
  faRectangleList = faRectangleList;
  faX = faX;
  faAngleDown = faAngleDown;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faLabel = faTag;
  faChecklist = faCheck;
  faDates = faClock;
  faAttachment = faPaperclip;
  faCover = faRectangleList;
  faCustom = faKeyboard;
  faMove = faArrowRight;
  faCopy = faCopy;
  faTemplate = faRectangleList;
  faArchive = faBoxArchive;
  faShare = faShareAlt;

  private dialogRef = inject(DialogRef);
  private data: DialogInputData = inject(DIALOG_DATA);

  card = this.data.card;
  list = this.data.list;

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'custom-dialog-container',
  standalone: true,
  imports: [DialogModule],
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  styles: ``,
})
export class CustomDialogContainer extends CdkDialogContainer {}
