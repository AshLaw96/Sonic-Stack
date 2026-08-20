// Global game configuration.

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const CELL_COUNT =
    GRID_WIDTH * GRID_HEIGHT;

export const START_POSITION = 4;

/**
 * Points awarded per line cleared
 * (index = lines cleared).
 */
export const LINE_CLEAR_POINTS = {
    1: 100,
    2: 300,
    3: 500,
    4: 800
};

export const GAME_SETTINGS = {

    easy: {
        interval: 1000
    },

    medium: {
        interval: 500
    },

    hard: {
        interval: 200
    }
};

/**
 * Every SPEED_UP_THRESHOLD points, the drop interval
 * decreases by SPEED_UP_STEP ms, down to a floor
 * of MIN_INTERVAL.
 */
export const SPEED_UP_THRESHOLD = 500;
export const SPEED_UP_STEP = 50;
export const MIN_INTERVAL = 100;

/**
 * Bonus points per consecutive line
 * clear (a lock with zero lines
 * cleared resets the streak).
 */
export const COMBO_BONUS = 50;

export const LEADERBOARD_SIZE = 5;
export const LEADERBOARD_KEY = "Leaderboard";