<script lang="ts">
	import GameCard from './GameCard.vue';
	import { defineComponent, PropType } from 'vue';
	import { Card, SelectedCard } from '../interfaces';

	export default defineComponent({
		name: 'GameBoard',
		components: { GameCard },
		props: {
			cardList: {
				type: Array as PropType<Array<Card>>,
				required: true,
			},
			newPlayer: {
				type: Boolean,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
			turns: {
				type: Number,
				required: true,
			},
		},
		emits: ['flip-card'],
		setup(props, context) {
			const selectCard = (payload: SelectedCard) => {
				context.emit('flip-card', payload);
			};

			return {
				selectCard,
			};
		},
	});
</script>
<template>
	<transition-group tag="section" class="game-board" name="shuffle-cards">
		<game-card
			v-for="card in cardList"
			:newPlayer="newPlayer"
			:value="card.value"
			:visible="card.visible"
			:key="`${card.value}-${card.variant}`"
			@select-card="selectCard"
			:card="card"
		/>
	</transition-group>
	<div class="info-container">
		<h2 class="status">{{ status }}</h2>
		<h2 class="turns">Turns: {{ turns }}</h2>
	</div>
</template>
