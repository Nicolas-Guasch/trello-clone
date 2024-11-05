import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleList, faX } from '@fortawesome/free-solid-svg-icons';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card-details.component.html',
})
export class CardDetailsComponent {
  faRectangleList = faRectangleList;
  faX = faX;

  private dialogRef = inject(DialogRef);

  close() {
    this.dialogRef.close();
  }
}
