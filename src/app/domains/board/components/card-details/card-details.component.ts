import { Component, inject, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faCheck,
  faClock,
  faKeyboard,
  faPaperclip,
  faPenClip,
  faRectangleList,
  faTag,
  faUser,
  faUserPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
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

  private dialogRef = inject(DialogRef);
  private data: DialogInputData = inject(DIALOG_DATA);

  card = this.data.card;
  list = this.data.list;

  close() {
    this.dialogRef.close();
  }
}
