import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faArrowRight,
  faBoxArchive,
  faCheck,
  faClock,
  faCopy,
  faKeyboard,
  faMinus,
  faPaperclip,
  faRectangleList,
  faRotateLeft,
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
  faRetry = faRotateLeft;
  faMinus = faMinus;

  private dialogRef = inject(DialogRef);
  private data: DialogInputData = inject(DIALOG_DATA);

  card = this.data.card;
  list = this.data.list;

  archived = signal(false);
  position = 0;

  submitTitle(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    const input = textArea.value.trim();
    if (input != '') {
      console.log(input);
      this.card.title = input;
      this.list.update((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id == this.card.id ? this.card : card,
        ),
      }));
    }
    textArea.blur();
  }

  archiveCard() {
    this.position = this.list().cards.indexOf(this.card);
    this.list.update((list) => ({
      ...list,
      cards: list.cards.filter((card) => card.id != this.card.id),
    }));
    //TODO: ADD TO ARCHIVE
    this.archived.set(true);
  }

  sendToBoard() {
    this.archived.set(false);
    this.list.update((list) => {
      list.cards.splice(this.position, 0, this.card);
      return { ...list };
    });
  }

  deleteCard() {
    //TODO: REMOVE FROM ARCHIVE
    this.close();
  }

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
