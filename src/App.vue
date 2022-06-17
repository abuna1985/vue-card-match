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
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import GameCard from "./components/GameCard.vue";
import { Card } from "./interfaces";
export default defineComponent({
  name: "App",
  components: { GameCard },
  setup() {
    const cardList = ref<Card[]>([]);

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
      });
    }

    const flipCard = (payload: Card) => {
      cardList.value[payload.position].visible = true;
    };

    return {
      cardList,
      flipCard,
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
