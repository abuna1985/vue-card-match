<script lang="ts">
import { defineComponent, computed } from "vue";
import { Card } from "../interfaces";

export default defineComponent({
  name: "game-card",
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    },
  },
  emits: ["select-card"],
  setup(props, context) {
    let flippedStyles = computed(() => {
      if (props.card.visible) {
        return "is-flipped";
      }

      return "";
    });

    const selectCard = () => {
      context.emit("select-card", {
        faceValue: props.card.value,
        position: props.card.position,
      });
    };

    return {
      flippedStyles,
      selectCard,
    };
  },
});
</script>

<template>
  <div class="card" @click="selectCard" :class="flippedStyles">
    <div class="card-face is-front">
      <img
        :src="`/assets/images/${card.value}.png`"
        :alt="card.value"
        class="card-face__image"
        loading="eager"
      />
      <img
        v-if="card.matched"
        src="/assets/images/checkmark.svg"
        class="icon-checkmark"
      />
    </div>
    <button class="card-face is-back"></button>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}
.card-face {
  align-items: center;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.card-face__image {
  width: 60px;
}

.card-face.is-front {
  background-color: #ffdc00;
  color: #ffffff;
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-color: #554d44;
  background-image: url("../../public/assets/images/card-bg-empty.png");
  color: #ffffff;
  cursor: pointer;
}

.card-face.is-back:hover,
.card-face.is-back:focus {
  background-color: #1f1c18;
}

.icon-checkmark {
  bottom: 3px;
  position: absolute;
  right: 3px;
}
</style>
