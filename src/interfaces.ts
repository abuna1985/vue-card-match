export interface Card {
  matched: boolean;
  position: number | null;
  value: string;
  variant: number;
  visible: boolean;
}

export interface SelectedCard {
  faceValue: number;
  position: number;
}
