// Collision detection helpers.

import { GRID_WIDTH } from "./config.js";

/**
 * Returns true if the active piece
 * touches the right wall.
 */
export function isTouchingRightWall(gameState) {

    return gameState.currentPiece.some(offset =>
        (
            gameState.position +
            offset +
            1
        ) % GRID_WIDTH === 0
    );
}

/**
 * Returns true if the active piece
 * touches the left wall.
 */
export function isTouchingLeftWall(gameState) {

    return gameState.currentPiece.some(offset =>
        (
            gameState.position +
            offset
        ) % GRID_WIDTH === 0
    );
}

/**
 * Prevents the active piece wrapping
 * around the board while rotating.
 */
export function stopTurning(gameState) {

    const centre = GRID_WIDTH / 2;

    const leftCentre = centre - 1;

    while (
        (gameState.position + 1) % GRID_WIDTH <
        centre &&
        isTouchingRightWall(gameState)
    ) {

        gameState.position++;
    }

    while (
        gameState.position % GRID_WIDTH >
        leftCentre &&
        isTouchingLeftWall(gameState)
    ) {

        gameState.position--;
    }
}

/**
* Returns true if a newly spawned
* piece overlaps locked blocks.
*/
export function isGameOver(gameState, boardCells) {

    return gameState.currentPiece.some(offset => {

        const cell =
            boardCells[
                gameState.position + offset
            ];

        return cell?.classList.contains("delete");
    });
}

/**
 * Returns the lowest position the active piece can occupy,
 * for the ghost piece preview.
 */
export function getGhostPosition(gameState, boardCells) {
 
    let position = gameState.position;
 
    while (
        !gameState.currentPiece.some(offset =>
            boardCells[
                position +
                offset +
                GRID_WIDTH
            ]?.classList.contains("delete")
        )
    ) {

        position += GRID_WIDTH;
    }

    return position;
}