<template>
  <div class="card" @click="selectCard">
    <div v-if="card.visible" class="card-face is-front">
      {{ card.value }}
    </div>
    <button v-else class="card-face is-back">Back</button>
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
  border: 5px solid #cccccc;
  position: relative;
}

.card-face {
  height: 100%;
  width: 100%;
}

.card-face.is-front {
  background-color: #ff4136;
  color: #ffffff;
  position: absolute;
}

.card-face.is-back {
  background-color: #0074d9;
  color: #ffffff;
  cursor: pointer;
}

.card-face.is-back:hover,
.card-face.is-back:focus {
  background-color: #0098d9;
}
</style>
