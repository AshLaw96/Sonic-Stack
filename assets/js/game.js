/* Game initialization function */

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const CELL_COUNT = GRID_WIDTH * GRID_HEIGHT;
export const STARTING_POSITION = 4;

export let score = 0;
export let highScore = Number(localStorage.getItem('highScore')) || 0

export let currentDifficulty = 'easy';

export let dropInterval = null;

export function initGame() {

    console.log('Initializing game...');

}