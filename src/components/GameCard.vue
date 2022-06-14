<template>
  <div class="card">{{ value }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "game-card",
  props: {
    value: { type: Number, required: true },
  },
});
</script>

<style scoped></style>
