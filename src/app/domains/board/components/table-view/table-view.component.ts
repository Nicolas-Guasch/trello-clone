import { Component, computed, input, WritableSignal } from '@angular/core';
import { BoardList } from '../../models/list-card.model';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSourceCards } from './data-source';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CdkTableModule],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent {
  boardLists = input.required<WritableSignal<WritableSignal<BoardList>[]>>();

  columns = ['Card', 'List', 'Labels', 'Members', 'Due date'];

  cards = new DataSourceCards();

  ngOnInit() {
    this.cards.init(this.boardLists());
  }
}
