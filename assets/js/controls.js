import { 
    GAME_SETTINGS,
    SPEED_UP_THRESHOLD,
    SPEED_UP_STEP,
    MIN_INTERVAL 
} from "./config.js";

import { playMusic, stopMusic } from "./audio.js";

import { resetGame } from "./gameController.js";

import { initTouchControls } from "./touch.js";

export function initialiseControls({
    ui,
    gameState,
    audio,
    moveLeft,
    moveRight,
    moveDown,
    hardDrop,
    rotate,
    hold,
    renderBoard
}) {

    function handleKeyboardInput(event) {
        // Allow 'P' or 'p' key to toggle pause at any time
        if (event.code === "KeyP") {
            if (gameState.isPaused) {
                renderBoard();
            }
            pausePlay(gameState, moveDown);
            return;
        }
        if (gameState.isPaused) {
            return;
        }
        switch (event.code) {

            case "ArrowLeft":
                moveLeft();
                break;

            case "ArrowRight":
                moveRight();
                break;

            case "ArrowUp":
                event.preventDefault();
                hardDrop();
                break;

            case "ArrowDown":
                moveDown();
                break;

            case "Space":
                event.preventDefault();
                rotate();
                break;

            case "KeyH":
            case "ShiftLeft":
            case "ShiftRight":
                event.preventDefault();
                hold();
                break;

            default:
                break;
        }
    }
    document.addEventListener(
        "keydown",
        handleKeyboardInput
    );
    if (ui.gameBoard) {
        initTouchControls(ui.gameBoard, {
            onMoveLeft: () => {
                if (!gameState.isPaused) moveLeft();
            },
            onMoveRight: () => {
                if (!gameState.isPaused) moveRight();
            },
            onSoftDrop: () => {
                if (!gameState.isPaused) moveDown();
            },
            onHardDrop: () => {
                if (!gameState.isPaused) hardDrop();
            },
            onRotate: () => {
                if (!gameState.isPaused) rotate();
            }
        });
    }
    ui.start.addEventListener(
        "click",
        () => {
            if (gameState.isPaused) {
                renderBoard();
            }
            pausePlay(gameState, moveDown);
        }
    );
    ui.left.addEventListener(
        "click",
        () => {
            if (!gameState.isPaused) {
                moveLeft();
            }
        }
    );
    ui.right.addEventListener(
        "click",
        () => {
            if (!gameState.isPaused) {
                moveRight();
            }
        }
    );
    ui.down.addEventListener(
        "click",
        () => {
            if (!gameState.isPaused) {
                moveDown();
            }
        }
    );
    if (ui.hardDrop) {
        ui.hardDrop.addEventListener(
            "click",
            () => {
                if (!gameState.isPaused) {
                    hardDrop();
                }
            }
        );
    }
    ui.rotate.addEventListener(
        "click",
        () => {
            if (!gameState.isPaused) {
                rotate();
            }
        }
    );
    if (ui.hold) {
        ui.hold.addEventListener(
            "click",
            () => {
                if (!gameState.isPaused) {
                    hold();
                }
            }
        );
    }
    ui.reset.addEventListener(
        "click",
        resetGame
    );
    ui.playAgain.addEventListener(
        "click",
        resetGame
    );
}

/**
 * Prevents the browser scrolling while
 * using keyboard controls.
 */
export function stopScroll(event) {

    const blockedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "KeyH",
        "ShiftLeft",
        "ShiftRight"
    ];
    if (blockedKeys.includes(event.code)) {
        event.preventDefault();
    }
}

/**
 * Tracks the current "down" callback so
 * adjustDropSpeed can restart the interval
 * without needing it re-passed.
 */
let activeDownCallback = null;

/**
 * Calculates the current drop interval,
 * factoring in score-based speed-up.
 */
export function calculateInterval(gameState) {

    const baseInterval =
        GAME_SETTINGS[
            gameState.difficulty
        ].interval;

    const speedUpSteps = Math.floor(
        gameState.score / SPEED_UP_THRESHOLD
    );
    const reduction = speedUpSteps * SPEED_UP_STEP;

    return Math.max(
        baseInterval - reduction,
        MIN_INTERVAL
    );
}

export function startGame(gameState, down) {

    if (gameState.dropInterval) {
        return;
    }
    activeDownCallback = down;

    playMusic(gameState.difficulty);

    gameState.resumeTimestamp = Date.now();

    gameState.dropInterval = setInterval(
        down,
        calculateInterval(gameState)
    );
    window.addEventListener("keydown", stopScroll);

    gameState.isPaused = false;
}

/**
 * Restarts drop interval at current speed.
 * Called whenever score changes.
 */
export function adjustDropSpeed(gameState) {

    if (!gameState.dropInterval || !activeDownCallback) {
        return;
    }
    clearInterval(gameState.dropInterval);

    gameState.dropInterval = setInterval(
        activeDownCallback,
        calculateInterval(gameState)
    );
}

export function stopGame(gameState) {

    clearInterval(gameState.dropInterval);

    gameState.dropInterval = null;

    if (gameState.resumeTimestamp) {
        gameState.PlayTimeMs += Date.now() 
            - gameState.resumeTimestamp;

        gameState.resumeTimestamp = null;
    }
    stopMusic();

    window.removeEventListener(
        "keydown",
        stopScroll
    );
    gameState.isPaused = true;
}

/**
 * Toggles between play and pause.
 */
export function pausePlay(gameState, down) {

    if (gameState.isPaused) {
        startGame(gameState, down);

    } else {
        stopGame(gameState);
    }
}