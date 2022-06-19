<template>
  <h1>Vue Matching Game</h1>
  <section class="game-board">
    <GameCard
      v-for="(card, index) in cardList"
      :value="card.value"
      :visible="card.visible"
      :key="`card-${index}`"
      @select-card="flipCard"
      :card="card"
    />
  </section>
  <h2>{{ status }}</h2>
  <button @click="restartGame">Restart Game</button>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { defineComponent } from "vue";
import GameCard from "./components/GameCard.vue";
import { Card, SelectedCard } from "./interfaces";
import { shuffle } from "./helpers/index";

export default defineComponent({
  name: "App",
  components: { GameCard },
  setup() {
    const cardList = ref<Card[]>([]);
    const userSelection = ref<SelectedCard[]>([]);
    let status = computed(() => {
      if (remainingPairs.value === 0) {
        return "Player Wins!";
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card: Card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    const shuffleCards = () => {
      cardList.value = shuffle(cardList.value);
    };

    const restartGame = () => {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        };
      });
    };
    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];
    cardItems.forEach((item, index) => {
      cardList.value.push({
        matched: false,
        value: item,
        visible: false,
        position: null,
      });

      cardList.value.push({
        matched: false,
        value: item,
        visible: false,
        position: index,
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    const flipCard = (payload: SelectedCard) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    };

    watch(
      userSelection,
      (currentValue: SelectedCard[]) => {
        if (currentValue.length === 2) {
          const [cardOne, cardTwo] = currentValue;

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 2000);
          }

          // cardTwo[cardTwo.position].visible = false;
          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      restartGame,
      status,
      shuffleCards,
      userSelection,
    };
  },
});
</script>

<style>
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}

.card__button {
  height: 100%;
  width: 100%;
}
</style>
