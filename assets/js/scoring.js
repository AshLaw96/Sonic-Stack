import {
    GRID_WIDTH,
    CELL_COUNT,
    LINE_CLEAR_POINTS,
    SPEED_UP_THRESHOLD,
    COMBO_BONUS
} from "./config.js";

import {audio, playSound} from "./audio.js";

import { adjustDropSpeed } from "./controls.js";

const CLEAR_ANIMATION_MS = 200;

/**
 * Updates the score and level display.
 */
export function updateScore(ui, gameState) {

    ui.currentScore.textContent =
        gameState.score;

    if (ui.level) {
        ui.level.textContent =
            Math.floor(
                gameState.score / SPEED_UP_THRESHOLD
            ) + 1;
    }
}

/**
 * Clears completed lines,
 * awards points and updates
 * the board.
 */
export function clearLines(
    gameState,
    boardCells,
    ui,
    audio
) {
 
    const completedRows = [];
 
    for (
        let row = 0;
        row <= CELL_COUNT - GRID_WIDTH;
        row += GRID_WIDTH
    ) {
        const currentRow = [];
 
        for (
            let i = 0;
            i < GRID_WIDTH;
            i++
        ) {
            currentRow.push(row + i);
        }
 
        const rowComplete =
            currentRow.every(index =>
                boardCells[index]
                    .classList.contains("delete")
            );
        if (!rowComplete) {
            continue;
        }
 
        completedRows.push(row);
 
        currentRow.forEach(index => {
 
            boardCells[index]
                .classList.add("clearing");
        });
    }
 
    if (completedRows.length === 0) {

        gameState.combo = 0;

        return Promise.resolve();
    }
    return new Promise(resolve => {
 
        setTimeout(() => {
 
            // Ascending order keeps each row's
            // index valid: clearing a row only
            // ever shifts indices below it, so
            // rows further down stay addressable.
            completedRows.forEach(row => {
    
                for (
                    let i = 0;
                    i < GRID_WIDTH;
                    i++
                ) {
                    const cell = boardCells[row + i];
    
                    cell.className = "";
                    cell.style.backgroundColor = "";
                    cell.style.boxShadow = "";
                }
                const removedRow =
                    boardCells.splice(row, GRID_WIDTH);

                boardCells.unshift(...removedRow); 
            });
            boardCells.forEach(cell => {
    
                ui.gameBoard.appendChild(cell);
            });
            const comboBonus =
                gameState.combo > 0
                    ? gameState.combo * COMBO_BONUS
                    : 0;

            gameState.score +=
                (LINE_CLEAR_POINTS[completedRows.length] ||
                    completedRows.length * 100) + 
                comboBonus;

            gameState.combo += 1;

            updateScore(ui, gameState);
    
            adjustDropSpeed(gameState);
    
            if (audio?.score) {
    
                playSound(audio.score); 
            }
            resolve();

        }, CLEAR_ANIMATION_MS);
    });
}