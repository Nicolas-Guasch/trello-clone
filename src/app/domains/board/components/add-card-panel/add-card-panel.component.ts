import {
  Component,
  ElementRef,
  input,
  Signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { BoardList, ListCard } from '../../models/list-card.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-card-panel',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-card-panel.component.html',
})
export class AddCardPanelComponent {
  faX = faX;
  list = input.required<WritableSignal<BoardList>>();

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  textarea = viewChild<ElementRef<HTMLTextAreaElement>>('input');
  ngAfterViewInit() {
    this.textarea()?.nativeElement.focus();
  }

  addCard() {
    const titleForm = this.form.get('title');
    if (titleForm?.valid) {
      const newCard: ListCard = {
        id: Date.now().toString(),
        title: titleForm.value!,
      };
      this.list().update((list) => ({
        ...list,
        cards: [...list.cards, newCard],
      }));
      this.form.reset();
      this.list().update((list) => ({ ...list, currentlyAdding: false }));
    }
  }

  cancel() {
    this.form.reset();
    this.list().update((list) => ({ ...list, currentlyAdding: false }));
  }
}
