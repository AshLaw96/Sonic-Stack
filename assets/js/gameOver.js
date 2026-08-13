import { stopGame } from "./controls.js";
 
import { saveHighScore } from "./game.js";
 
import { playSound } from "./audio.js";

export function endGame(
    gameState,
    ui,
    audio
) {

    stopGame(gameState);

    saveHighScore();

    ui.highScore.textContent =
        gameState.highScore;

    playSound(audio.gameOver);

    ui.dialog.showModal();
}