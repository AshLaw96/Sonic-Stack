/**
 * Core gameplay logic.
 */
import {
    gameState,
    spawnNextPiece,
    updateRotation,
} from "./game.js";

import { endGame } from "./gameOver.js";

import { GRID_WIDTH } from "./config.js";

import { TETROMINOES } from "./pieces.js";

import {
    makeBlocks,
    removeBlocks,
    renderNextPiece
} from "./renderer.js";

import { clearLines } from "./scoring.js";

import { stopTurning, isGameOver}
    from "./collision.js";

import {audio, playSound} 
    from "./audio.js";

/**
 * Locks the current tetromino and
 * spawns the next piece.
 */
export async function lockPiece(
    boardCells,
    ui,
    audio
) {

    gameState.isLocking = true;

    gameState.currentPiece.forEach(offset => {

        boardCells[
            gameState.position + offset
        ].classList.add("delete");
    });

    await clearLines(
        gameState,
        boardCells,
        ui,
        audio
    );

    spawnNextPiece();

    renderNextPiece(ui, gameState);

    makeBlocks(gameState, boardCells);

    stopTurning(gameState);

    gameState.isLocking = false;

    if (isGameOver(gameState,boardCells)) {

        endGame(
            gameState,
            ui,
            audio
        );
    }
}

/**
 * Moves the active piece left.
 */
export function left(boardCells) {

    if (gameState.isLocking) {
        return;
    }

    removeBlocks(gameState, boardCells);

    const touchingWall =
        gameState.currentPiece.some(offset =>
            (
                gameState.position +
                offset
            ) % GRID_WIDTH === 0
        );

    if (!touchingWall) {
        gameState.position--;
    }

    const blocked =
        gameState.currentPiece.some(offset =>
            boardCells[
                gameState.position + offset
            ].classList.contains("delete")
        );

    if (blocked) {
        gameState.position++;
    }

    makeBlocks(gameState, boardCells);
}

/**
 * Moves the active piece right.
 */
export function right(boardCells) {

    if (gameState.isLocking) {
        return;
    }

    removeBlocks(gameState, boardCells);

    const touchingWall =
        gameState.currentPiece.some(offset =>
            (
                gameState.position +
                offset
            ) % GRID_WIDTH === GRID_WIDTH - 1
        );

    if (!touchingWall) {
        gameState.position++;
    }

    const blocked =
        gameState.currentPiece.some(offset =>
            boardCells[
                gameState.position + offset
            ].classList.contains("delete")
        );

    if (blocked) {
        gameState.position--;
    }

    makeBlocks(gameState, boardCells);
}

/**
 * Moves the active piece down.
 */
export function down(
    boardCells,
    ui,
    audio
) {

    if (gameState.isLocking) {
        return;
    }

    const canMove =
        !gameState.currentPiece.some(offset =>
            boardCells[
                gameState.position +
                offset +
                GRID_WIDTH
            ].classList.contains("delete")
        );

    if (canMove) {

        removeBlocks(gameState, boardCells);

        gameState.position += GRID_WIDTH;
    
        makeBlocks(gameState, boardCells);

        return;
    }
    
    lockPiece(
        boardCells,
        ui,
        audio
    );
}

/**
 * Rotates the active piece.
 */
export function turn(boardCells) {

    if (gameState.isLocking) {
        return;
    }

    removeBlocks(gameState, boardCells);

    let rotation =
        gameState.rotation + 1;

    if (
        rotation >=
        TETROMINOES[
            gameState.currentPieceIndex
        ].rotations.length
    ) {

        rotation = 0;
    }

    updateRotation(rotation);

    stopTurning(gameState);

    makeBlocks(gameState, boardCells);

    playSound(audio.rotate);
}

/**
 * Hard drops the active piece directly to the bottom.
 */
export function hardDrop(
    boardCells,
    ui,
    audio
) {
    if (gameState.isLocking) {
        return;
    }

    // Helper to check if piece can move down 1 step
    const canMoveDown = () =>
        !gameState.currentPiece.some(offset =>
            boardCells[
                gameState.position +
                offset +
                GRID_WIDTH
            ].classList.contains("delete")
        );

    // Remove active block CSS before moving
    removeBlocks(gameState, boardCells);

    // Keep dropping while path is clear
    while (canMoveDown()) {
        gameState.position += GRID_WIDTH;
    }

    // Draw blocks at final position and lock
    makeBlocks(gameState, boardCells);

    lockPiece(
        boardCells,
        ui,
        audio
    );
}