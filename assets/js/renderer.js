// Draws and clears tetrominoes.

import { getPiece } from "./pieces.js";

import { GRID_WIDTH } from "./config.js";

import { getGhostPosition} from "./collision.js"

/**
 * Draws the active tetromino. Plus its
 * ghost-piece preview.
 */
export function makeBlocks(gameState, boardCells) {

    const pieceOffsets = gameState.currentPiece;

    if (!pieceOffsets) {
        return;
    }

    const tetromino =
        getPiece(gameState.currentPieceIndex);

    const colour = tetromino.color;

    const shadow = tetromino.shadow;

    // Clear previous ghost before redrawing new one.
    boardCells.forEach(cell => {

        cell.classList.remove("ghost");
    });

    const ghostPosition = 
        getGhostPosition(gameState, boardCells);

    pieceOffsets.forEach(offset => {

        const ghostCell =
            boardCells[
                ghostPosition + offset
            ];

        if (ghostCell && !ghostCell.classList.contains("sqr")) {

            ghostCell.classList.add("ghost");

            ghostCell.style.setProperty(
                "--ghost-color",
                colour
            );
        }
    });

    pieceOffsets.forEach(offset => {

        const cell =
            boardCells[
                gameState.position + offset
            ];

        if (!cell) {
            return;
        }

        cell.classList.add("sqr");

        cell.style.backgroundColor = colour;

        cell.style.boxShadow = shadow;

    });

}

/**
 * Removes the active tetromino.
 */
export function removeBlocks(gameState, boardCells) {

    const pieceOffsets = gameState.currentPiece;

    if (!pieceOffsets) {
        return;
    }

    pieceOffsets.forEach(offset => {

        const cell =
            boardCells[
                gameState.position + offset
            ];

        if (!cell) {
            return;
        }

        cell.classList.remove("sqr");

        cell.style.backgroundColor = "";

        cell.style.boxShadow = "";

    });
}

/**
 * Draws a small preview of the upcoming
 * tetromino.
 */
export function renderNextPiece(ui, gameState) {
 
    if (!ui.nextPiece) {
        return;
    }
 
    ui.nextPiece.innerHTML = "";
 
    const tetromino =
        getPiece(gameState.nextPieceIndex);
 
    const offsets = tetromino.rotations[0];
 
    const cells = offsets.map(offset => ({
 
        row: Math.floor(offset / GRID_WIDTH),
        col: offset % GRID_WIDTH
    }));
 
    const minRow =
        Math.min(...cells.map(cell => cell.row));
 
    const minCol =
        Math.min(...cells.map(cell => cell.col));
 
    const previewSize = 4;
 
    const grid = document.createElement("div");

    grid.classList.add("next-piece-grid");
 
    for (let i = 0; i < previewSize * previewSize; i++) {
 
        grid.appendChild(
            document.createElement("div")
        );
    }
 
    cells.forEach(({ row, col }) => {
 
        const normalisedRow = row - minRow;
 
        const normalisedCol = col - minCol;
 
        const index =
            (normalisedRow * previewSize) +
            normalisedCol;
 
        const previewCell = grid.children[index];
 
        if (previewCell) {
 
            previewCell.style.backgroundColor =
                tetromino.color;
 
            previewCell.style.boxShadow =
                tetromino.shadow;
        }
    });
 
    ui.nextPiece.appendChild(grid);
}