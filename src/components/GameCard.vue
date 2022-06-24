<template>
  <div class="card" @click="selectCard">
    <div v-if="card.visible" class="card-face is-front">
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
    <button v-else class="card-face is-back"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Card } from "../interfaces";

export default defineComponent({
  name: "game-card",
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    },
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit("select-card", {
        faceValue: props.card.value,
        position: props.card.position,
      });
    };

    return {
      selectCard,
    };
  },
});
</script>

<style scoped>
.card {
  position: relative;
}

.card-face {
  align-items: center;
  border-radius: 10px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.card-face__image {
  width: 60px;
}

.card-face.is-front {
  background-color: #ffdc00;
  color: #ffffff;
  position: absolute;
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
