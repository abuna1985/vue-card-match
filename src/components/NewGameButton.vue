<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'NewGameButton',
		props: {
			newPlayer: {
				type: Boolean,
				default: true,
			},
		},
		emits: ['start-new-game'],
		setup(props, { emit }) {
			const startNewGame = () => {
				emit('start-new-game');
			};

			return {
				startNewGame,
			};
		},
	});
</script>
<template>
	<button v-if="newPlayer" @click="startNewGame" :class="$style.button">
		<!-- https://www.thisdot.co/blog/styling-vue-single-file-components#style-modules -->
		<div :class="$style['button-icon']">
			<img
				:class="$style['icon-play']"
				class="button__image"
				src="assets/images/play.svg"
				alt="Play Icon"
			/><img
				:class="$style['icon-campfire']"
				class="button__image"
				src="assets/images/campfire.svg"
				alt="Tent"
			/>
		</div>
		Start Game
	</button>
	<button v-else @click="startNewGame" :class="$style.button">
		<div :class="$style['button-icon']">
			<img
				:class="$style['icon-restart-light']"
				class="button__image"
				src="assets/images/restart-light.svg"
				alt="Restart Icon Light"
			/><img
				:class="$style['icon-restart-dark']"
				class="button__image"
				src="assets/images/restart-dark.svg"
				alt="Restart Icon Dark"
			/>
		</div>
		Restart Game
	</button>
</template>
<style module>
	.button {
		align-items: center;
		background-color: #554d44;
		border: 2px solid #554d44;
		border-radius: 10px;
		cursor: pointer;
		color: #ffffff;
		display: flex;
		font-size: 1.2rem;
		font-weight: bold;
		justify-content: center;
		margin: 1rem auto;
		padding: 0.75rem 1rem;
		transition: 0.3s all;
	}

	.button__image {
		padding-right: 12px;
		transition: 0.2s opacity ease-in;
	}

	.button-icon {
		position: relative;
		width: 24px;
		height: 24px;
	}

	.button:hover {
		color: #554d44;
		background-color: transparent;
	}

	.button:hover .icon-campfire {
		opacity: 1;
	}

	.button:hover .icon-play {
		opacity: 0;
	}

	.button .icon-campfire {
		position: absolute;
		left: -6px;
		opacity: 0;
		top: -2px;
	}

	.button .icon-play {
		position: absolute;
		left: -6px;
		opacity: 1;
	}

	.button .icon-restart-light,
	.button .icon-restart-dark {
		position: absolute;
		left: -3px;
		top: 3px;
	}

	.button .icon-restart-dark {
		opacity: 0;
	}

	.button:hover .icon-restart-dark {
		opacity: 1;
	}

	.button:hover .icon-restart-light {
		opacity: 0;
	}
</style>
