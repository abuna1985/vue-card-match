import { ref, Ref, computed, ComputedRef } from 'vue';
import { shuffle } from '../helpers/index';
import { Card } from '@/interfaces';
import { setupFunction } from '@/types';

export default function createGame(deck: Ref<Card[]>) {
	const newPlayer = ref<boolean>(true);
	const turns = ref<number>(0);

	const startGame: setupFunction = () => {
		newPlayer.value = false;
		restartGame();
	};

	const shuffleCards: setupFunction = () => {
		deck.value = shuffle(deck.value);
	};

	const increaseTurn: setupFunction = () => {
		turns.value++;
	};

	const restartGame: setupFunction = () => {
		turns.value = 0;
		shuffleCards();

		deck.value = deck.value.map((card: Card, index: number) => {
			return {
				...card,
				matched: false,
				position: index,
				visible: false,
			};
		});
	};

	const status: ComputedRef<string> = computed(() => {
		if (remainingPairs.value === 0) {
			return 'Player Wins!';
		} else {
			return `Remaining Pairs: ${remainingPairs.value}`;
		}
	});

	const remainingPairs: ComputedRef<number> = computed(() => {
		const remainingCards = deck.value.filter(
			(card: Card) => card.matched === false
		).length;

		return remainingCards / 2;
	});

	return {
		newPlayer,
		startGame,
		restartGame,
		increaseTurn,
		status,
		remainingPairs,
		turns,
	};
}
