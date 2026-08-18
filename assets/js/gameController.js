/**
 * Coordinates the game.
*/
import { ui } from "./dom.js";

import { audio, setMuted } from "./audio.js";

import { 
    gameState, 
    initialisePieces,
    resetGameState
 } from "./game.js";

import { createBoard, clearBoard } from "./board.js";

import { initialiseControls, stopGame } from "./controls.js";

import { initialiseUI, initialiseHero, closeDialog } from "./ui.js";

import { makeBlocks, renderNextPiece } from "./renderer.js";

import { updateScore } from "./scoring.js";

import {
    left,
    right,
    down,
    turn
} from "./gameplay.js";

let boardCells = [];

/**
 * Starts the game.
 */
export function initialiseGame() {

    boardCells =
        createBoard(ui.gameBoard);

    initialisePieces();

    renderNextPiece(ui, gameState);

    initialiseUI(ui, gameState);

    initialiseHero(ui, gameState);

    setMuted(gameState.isMuted);

    if (!ui.gameBoard) {
        return;
    }

    initialiseControls({

        ui,
        gameState,
        audio,

        moveLeft: () =>
            left(boardCells),

        moveRight: () =>
            right(boardCells),

        moveDown: () =>
            down(
                boardCells,
                ui,
                audio
            ),

        rotate: () =>
            turn(boardCells, audio),

        renderBoard: () =>
            makeBlocks(gameState, boardCells)
    });
}

/**
 * Resets the current game.
 */
export function resetGame() {

    stopGame(gameState);

    clearBoard(boardCells);

    resetGameState();

    initialisePieces();

    renderNextPiece(ui, gameState);

    makeBlocks(gameState, boardCells);

    updateScore(ui, gameState);

    ui.highScore.textContent =
        gameState.highScore;

    closeDialog(ui);
}