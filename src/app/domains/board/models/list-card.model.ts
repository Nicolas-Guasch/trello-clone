export interface Label {
  id: string;
  title: string;
  color: string;
}

export interface ListCard {
  id: string;
  title: string;
  dueDate?: string;
  labels?: Label[];
}

export interface BoardList {
  id: string;
  title: string;
  cards: ListCard[];
  currentlyAdding: boolean;
}
