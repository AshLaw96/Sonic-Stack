// ==========================================
// Game State
// ==========================================

/**
* Draws the active tetromino.
*/
export function makeBlocks(gameState, boardCells) {

    const colour =
        BLOCK_COLORS[gameState.currentPieceIndex];

    const shadow =
        BLOCK_SHADOWS[colour] || "";

    gameState.currentPiece.forEach(offset => {

        const cell =
            boardCells[
                gameState.position + offset
            ];

        if (!cell) return;

        cell.classList.add("sqr");
        cell.style.backgroundColor = colour;
        cell.style.boxShadow = shadow;

    });

}

// ==========================================
// Rendering & Scoring
// ==========================================

/**
* Removes the active tetromino.
*/
export function removeBlocks(gameState, boardCells) {

    gameState.currentPiece.forEach(offset => {

        const cell =
            boardCells[
                gameState.position + offset
            ];

        if (!cell) return;

        cell.classList.remove("sqr");
        cell.style.backgroundColor = "";
        cell.style.boxShadow = "";

    });

}