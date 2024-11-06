import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BoardList, ListCard } from '../../models/list-card.model';
import { Observable } from 'rxjs';
import { computed, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TableEntry } from '../../models/table-entry.model';

export class DataSourceCards extends DataSource<TableEntry> {
  data: WritableSignal<WritableSignal<BoardList>[]> = signal([]);

  cards = computed(() =>
    this.data()
      .map((list) =>
        list().cards.map((card) => ({ card: card, list: list().title })),
      )
      .flat(),
  );

  override connect(): Observable<readonly TableEntry[]> {
    return toObservable(this.cards);
  }

  init(data: WritableSignal<WritableSignal<BoardList>[]>) {
    this.data = data;
  }

  override disconnect(): void {
    throw new Error('Method not implemented.');
  }
}
