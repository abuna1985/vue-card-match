<script lang="ts">
import { ref, watch, defineComponent } from "vue";
import GameBoard from "./components/GameBoard.vue";
import AppFooter from "./components/AppFooter.vue";
import { SelectedCard } from "./interfaces";
import { launchConfetti } from "./helpers/index";
import createDeck from "./features/createDeck";
import campDeck from "./data/campDeck.json";
import createGame from "./features/createGame";

export default defineComponent({
  name: "App",
  components: { GameBoard, AppFooter },
  setup() {
    const { cardList } = createDeck(campDeck);
    let {
      newPlayer,
      startGame,
      restartGame,
      increaseTurn,
      status,
      remainingPairs,
      turns,
    } = createGame(cardList);

    const userSelection = ref<SelectedCard[]>([]);
    const userCanFlipCard = ref<boolean>(true);

    const flipCard = (payload: SelectedCard) => {
      if (userCanFlipCard.value) {
        cardList.value[payload.position].visible = true;

        if (userSelection.value[0]) {
          if (
            userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue
          ) {
            return;
          }
          userSelection.value[1] = payload;
        } else {
          userSelection.value[0] = payload;
        }

        if (cardList.value[payload.position].matched === false) {
          increaseTurn();
        }
      } else {
        return;
      }
    };

    watch(remainingPairs, (currentValue) => {
      if (currentValue === 0) {
        launchConfetti();
      }
    });
    watch(
      userSelection,
      (currentValue: SelectedCard[]) => {
        if (currentValue.length === 2) {
          const [cardOne, cardTwo] = currentValue;
          // Disable ability to flip cards
          userCanFlipCard.value = false;

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
            userCanFlipCard.value = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
              // Allow user to flip a new card
              userCanFlipCard.value = true;
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
      increaseTurn,
      newPlayer,
      restartGame,
      startGame,
      status,
      turns,
      userSelection,
    };
  },
});
</script>

<template>
  <h1 class="title">Vue Matching Game</h1>
  <section class="description">
    <p class="description__text">
      A Card matching game powered by Vue.js 3 and TypeScript
    </p>
  </section>
  <button v-if="newPlayer" @click="startGame" class="button">
    <img src="/assets/images/play.svg" alt="Start Icon" class="button__image" />
    Start Game
  </button>
  <button v-else @click="restartGame" class="button">
    <img
      src="/assets/images/restart.svg"
      alt="Restart Icon"
      class="button__image"
    />
    Restart Game
  </button>
  <game-board
    :cardList="cardList"
    :status="status"
    :turns="turns"
    @flip-card="flipCard"
  ></game-board>
  <app-footer></app-footer>
</template>

<style>
#app {
  background: #a1e6e3 url("/public/assets/images/page-bg.png") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #111111;
  font-family: "Raleway", sans-serif;
  min-height: 100vh;
  padding: 0 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  padding: 1.25rem 0;
  font-weight: bold;
}

.description__text {
  font-size: 1.2rem;
}

.button {
  align-items: center;
  background-color: #554d44;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  font-size: 1.2rem;
  font-weight: semi-bold;
  justify-content: center;
  margin: 1rem auto;
  padding: 0.75rem 1rem;
}

.button__image {
  padding-right: 8px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(60px, 110px));
  grid-template-rows: repeat(4, minmax(60px, 110px));
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  justify-content: center;
}

.card__button {
  height: 100%;
  width: 100%;
}

.info-container {
  background: rgba(0, 0, 0, 0.25);
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  margin: 0.5rem auto;
  min-width: 100px;
  max-width: 460px;
}

.status,
.turns {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem 0;
}

.shuffle-cards-move {
  transition: transform 0.8s ease-in;
}
</style>
