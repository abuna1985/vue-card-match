import { ref, Ref, computed } from "vue";
import { shuffle } from "../helpers/index";
import { Card } from "@/interfaces";

export default function createGame(deck: Ref<Card[]>) {
  const newPlayer = ref<boolean>(true);
  const turns = ref<number>(0);

  const startGame = () => {
    newPlayer.value = false;
    restartGame();
  };

  const shuffleCards = () => {
    deck.value = shuffle(deck.value);
  };

  const increaseTurn = () => {
    turns.value++;
  };

  const restartGame = () => {
    turns.value = 0;
    shuffleCards();

    deck.value = deck.value.map((card: Card, index: number) => {
      return {
        ...card,
        matched: false,
        position: index,
        visible: false,
      };
    });
    console.log({ deck });
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      return "Player Wins!";
    } else {
      return `Remaining Pairs: ${remainingPairs.value}`;
    }
  });

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter(
      (card: Card) => card.matched === false
    ).length;

    return remainingCards / 2;
  });

  return {
    newPlayer,
    startGame,
    restartGame,
    increaseTurn,
    status,
    remainingPairs,
    turns,
  };
}
