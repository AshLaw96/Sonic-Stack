/**
 * Builds and manages the game board.
 */

import {
    CELL_COUNT,
    GRID_WIDTH
} from "./config.js";

/**
 * Creates the game board.
 */
export function createBoard(gameBoard) {

    if (!gameBoard) {
        return [];
    }

    // Preserve the decorative rings before wiping the board
    const decorElement = gameBoard.querySelector(".decor");

    gameBoard.innerHTML = "";

    if (decorElement) {
        gameBoard.appendChild(decorElement);
    }

    for (let i = 0; i < CELL_COUNT; i++) {

        gameBoard.appendChild(
            document.createElement("div")
        );
    }

    for (let i = 0; i < GRID_WIDTH; i++) {

        const cell = document.createElement("div");

        cell.classList.add("delete");

        gameBoard.appendChild(cell);
    }

    return Array.from(
        gameBoard.querySelectorAll("div:not(.decor)")
    );
}

/**
 * Clears every playable cell.
 */
export function clearBoard(boardCells) {

    boardCells
        .slice(0, CELL_COUNT)
        .forEach(cell => {

            cell.className = "";

            cell.style.backgroundColor = "";

            cell.style.boxShadow = "";
        });
}