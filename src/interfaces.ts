export interface Card {
  matched: boolean;
  position: number;
  value: number;
  visible: boolean;
}

export interface SelectedCard {
  faceValue: number;
  position: number;
}
