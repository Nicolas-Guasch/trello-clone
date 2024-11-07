import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BoardList, ListCard } from '../../models/list-card.model';
import { Observable } from 'rxjs';
import { computed, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TableEntry } from '../../models/table-entry.model';

export class DataSourceCards extends DataSource<TableEntry> {
  data: WritableSignal<WritableSignal<BoardList>[]> = signal([]);

  searchQuery = signal('');

  cards = computed(() =>
    this.data()
      .map((list) =>
        list().cards.map((card) => ({ card: card, list: list().title })),
      )
      .flat()
      .filter((entry) =>
        [
          entry.card.title.toLowerCase(),
          entry.list.toLowerCase(),
          entry.card.dueDate ?? '',
          ...(entry.card.labels?.map((label) => label.title.toLowerCase()) ??
            []),
        ].some((value) => {
          console.log(value);
          return value.includes(this.searchQuery().toLowerCase());
        }),
      ),
  );

  cards$ = toObservable(this.cards);

  override connect(): Observable<readonly TableEntry[]> {
    return this.cards$;
  }

  init(data: WritableSignal<WritableSignal<BoardList>[]>) {
    this.data = data;
  }

  update(id: ListCard['id'], changes: Partial<ListCard>) {
    console.log(changes);
    this.data.update((lists) => {
      lists.forEach((list) => {
        list.update((list) => ({
          ...list,
          cards: list.cards.map((card) =>
            card.id === id ? { ...card, ...changes } : card,
          ),
        }));
      });
      return [...lists];
    });
  }

  find(query: string) {
    this.searchQuery.set(query);
  }

  override disconnect(): void {}
}
