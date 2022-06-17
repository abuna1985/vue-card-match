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
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { defineComponent } from "vue";
import GameCard from "./components/GameCard.vue";
import { Card, SelectedCard } from "./interfaces";

type Status = "Pending" | "Matched!" | "Mismatch!";

export default defineComponent({
  name: "App",
  components: { GameCard },
  setup() {
    const cardList = ref<Card[]>([]);
    const userSelection = ref<SelectedCard[]>([]);
    const status = ref<Status>("Pending");
    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        matched: false,
        value: i,
        visible: false,
        position: i,
      });
    }

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
            status.value = "Matched!";

            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            status.value = "Mismatch!";

            cardList.value[cardOne.position].visible = false;
            cardList.value[cardTwo.position].visible = false;
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
      status,
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
