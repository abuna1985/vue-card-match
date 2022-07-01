import { ref } from "vue";
import { Card } from "../interfaces";

const cardList = ref<Card[]>([]);

const initDeck = (deckData: string[]) => {
  deckData.forEach((item, index) => {
    cardList.value.push({
      matched: false,
      value: item,
      variant: 1,
      visible: false,
      position: null,
    });

    cardList.value.push({
      matched: false,
      variant: 2,
      value: item,
      visible: true,
      position: index,
    });
  });
};

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
};

export default function createDeck(deckData: string[]) {
  initDeck(deckData);
  updateCardPosition();

  return {
    cardList,
  };
}
