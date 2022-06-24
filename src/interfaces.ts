export interface Card {
  matched: boolean;
  position: number | null;
  value: string;
  visible: boolean;
}

export interface SelectedCard {
  faceValue: number;
  position: number;
}
