export interface Card {
  matched: boolean;
  position: number | null;
  value: number;
  visible: boolean;
}

export interface SelectedCard {
  faceValue: number;
  position: number;
}
