<template>
  <h1>Vue Matching Game</h1>
  <section class="game-board">
    <GameCard
      v-for="(card, index) in cardList"
      :value="card"
      :key="`card-${index}`"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "./components/GameCard.vue";

export default defineComponent({
  name: "App",
  components: { GameCard },
  setup() {
    const cardList = [...Array(16)].map((card, i) => i + 1);

    return {
      cardList,
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

.card {
  border: 5px solid #ccc;
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
