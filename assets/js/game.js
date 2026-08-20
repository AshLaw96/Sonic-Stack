// Game state and shared constants.
import { TETROMINOES, getRandomPiece } from "./pieces.js";

import { START_POSITION } from "./config.js";

export const gameState = {

    score: 0,

    highScore:
        Number(localStorage.getItem("High-Score")) || 0,

    position: START_POSITION,

    rotation: 0,

    currentPieceIndex: 0,

    currentPiece: null,

    nextPieceIndex: 0,

    holdPieceIndex: null,

    canHold: true,

    difficulty: 
        localStorage.getItem("Difficulty") || "easy",

    dropInterval: null,

    isPaused: true,

    isLocking: false,

    combo: 0,

    isMuted:
        localStorage.getItem("Muted") !== "false"
};

/**
 * Creates the first active piece and
 * prepares the next piece.
 */
export function initialisePieces() {

    gameState.rotation = 0;

    gameState.position = START_POSITION;

    gameState.currentPieceIndex =
        getRandomPiece();

    gameState.currentPiece =
        TETROMINOES[
            gameState.currentPieceIndex
        ].rotations[
            gameState.rotation
        ];

    gameState.nextPieceIndex =
        getRandomPiece();

    gameState.holdPieceIndex = null;

    gameState.canHold = true;
}

export function spawnNextPiece() {

    gameState.currentPieceIndex =
        gameState.nextPieceIndex;

    gameState.nextPieceIndex =
        getRandomPiece();

    gameState.rotation = 0;

    gameState.position = START_POSITION;

    gameState.currentPiece =
        TETROMINOES[
            gameState.currentPieceIndex
        ].rotations[
            gameState.rotation
        ];

    gameState.canHold = true;
}

/**
 * Swaps current piece into hold slot (once per drop).
 * Returns true if hold operation succeeded.
 */
export function holdPiece() {

    if (!gameState.canHold || gameState.isPaused) {
        return false;
    }

    gameState.rotation = 0;
    gameState.position = START_POSITION;

    if (gameState.holdPieceIndex === null) {

        gameState.holdPieceIndex = gameState.currentPieceIndex;

        gameState.currentPieceIndex = gameState.nextPieceIndex;

        gameState.nextPieceIndex = getRandomPiece();

    } else {

        const tempIndex = gameState.currentPieceIndex;

        gameState.currentPieceIndex = gameState.holdPieceIndex;

        gameState.holdPieceIndex = tempIndex;
    }

    gameState.currentPiece = TETROMINOES[gameState.currentPieceIndex].rotations[0];

    gameState.canHold = false;

    return true;
}

export function updateRotation(rotation) {

    gameState.rotation = rotation;

    gameState.currentPiece =
        TETROMINOES[
            gameState.currentPieceIndex
        ].rotations[
            rotation
        ];
}


export function resetScore() {

    gameState.score = 0;
}

export function saveHighScore() {

    if (
        gameState.score > gameState.highScore
    ) {

        gameState.highScore = gameState.score;

        localStorage.setItem(
            "High-Score",
            gameState.highScore
        );
    }
}

export function resetGameState() {

    gameState.score = 0;

    gameState.dropInterval = null;

    gameState.isPaused = true;

    gameState.combo = 0;

    gameState.currentPiece = null;

    gameState.holdPieceIndex = null;

    gameState.canHold = true;

    initialisePieces();
}