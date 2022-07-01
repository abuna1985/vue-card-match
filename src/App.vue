<script lang="ts">
import { computed, ref, watch } from "vue";
import { defineComponent } from "vue";
import GameCard from "./components/GameCard.vue";
import { Card, SelectedCard } from "./interfaces";
import { shuffle, launchConfetti } from "./helpers/index";

export default defineComponent({
  name: "App",
  components: { GameCard },
  setup() {
    const cardList = ref<Card[]>([]);
    const userSelection = ref<SelectedCard[]>([]);
    const turns = ref<number>(0);
    const newPlayer = ref<boolean>(true);

    const startGame = () => {
      newPlayer.value = false;

      restartGame();
    };

    const increaseTurn = () => {
      turns.value++;
    };

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
      turns.value = 0;
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

    const cardItems = [
      "backpack",
      "campfire",
      "camping",
      "compass",
      "deer",
      "map",
      "nature",
      "sleeping-bag",
    ];
    cardItems.forEach((item, index) => {
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

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });
    const flipCard = (payload: SelectedCard) => {
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
      turns,
      flipCard,
      increaseTurn,
      newPlayer,
      restartGame,
      startGame,
      status,
      shuffleCards,
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
  <transition-group tag="section" class="game-board" name="shuffle-cards">
    <GameCard
      v-for="card in cardList"
      :value="card.value"
      :visible="card.visible"
      :key="`${card.value}-${card.variant}`"
      @select-card="flipCard"
      :card="card"
    />
  </transition-group>
  <div class="info-container">
    <h2 class="status">{{ status }}</h2>
    <h2 class="turns">Turns: {{ turns }}</h2>
  </div>
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
