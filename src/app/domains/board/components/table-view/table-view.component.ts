import { Component, computed, input, WritableSignal } from '@angular/core';
import { BoardList, ListCard } from '../../models/list-card.model';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSourceCards } from './data-source';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableEntry } from '../../models/table-entry.model';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CdkTableModule, ButtonComponent, DatePipe, ReactiveFormsModule],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent {
  boardLists = input.required<WritableSignal<WritableSignal<BoardList>[]>>();

  columns = ['Card', 'List', 'Labels', 'Members', 'Due date', 'Actions'];

  cards = new DataSourceCards();

  searchInput = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.cards.init(this.boardLists());

    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.cards.find(value));
  }

  setDueTomorrow(entry: TableEntry) {
    let deadline = new Date(Date.now());
    deadline.setDate(deadline.getDate() + 1);
    deadline.setHours(0, 0, 0, 0);
    this.cards.update(entry.card.id, { dueDate: deadline.toISOString() });
  }
  labelExperimental(entry: TableEntry) {
    this.cards.update(entry.card.id, {
      labels: [{ id: '1', title: 'Experimental', color: '#fca5a5' }],
    });
  }
}
