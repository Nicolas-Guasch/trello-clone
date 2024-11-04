export interface ListCard {
  id: string;
  title: string;
}

export interface BoardList {
  id: string;
  title: string;
  cards: ListCard[];
}
