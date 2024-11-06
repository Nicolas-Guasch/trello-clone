import { Component, input, WritableSignal } from '@angular/core';
import { BoardList } from '../../models/list-card.model';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent {
  boardLists = input.required<WritableSignal<WritableSignal<BoardList>[]>>();
}
