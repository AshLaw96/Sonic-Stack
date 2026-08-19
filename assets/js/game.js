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

    difficulty: 
        localStorage.getItem("Difficulty") || "easy",

    dropInterval: null,

    isPaused: true,

    isLocking: false,

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
        gameState.score >
        gameState.highScore
    ) {

        gameState.highScore =
            gameState.score;

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

    gameState.currentPiece = null;

    initialisePieces();
}