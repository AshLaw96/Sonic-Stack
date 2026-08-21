import { stopGame } from "./controls.js";
 
import { 
    saveHighScore, 
    saveToLeaderboard, 
    getLeaderboard 
} from "./game.js";

import { renderLeaderboard, renderGameStats } from "./ui.js";
 
import { playSound } from "./audio.js";

export function endGame(gameState, ui, audio) {

    stopGame(gameState);

    saveHighScore();

    if (ui.highScore) {
        ui.highScore.textContent = gameState.highScore;
    }
    playSound(audio.gameOver);

    if (ui.initialsInput) {
        ui.initialsInput.value = "";
    }
    if (ui.initialsForm) {
        ui.initialsForm.style.display = "block";
    }
    renderGameStats(ui, gameState);
    
    const currentBoard = getLeaderboard();

    renderLeaderboard(ui, currentBoard, null);

    const handleScoreSubmit = () => {

        const initials = ui.initialsInput ? 
            ui.initialsInput.value : "AAA";

        const { leaderboard, currentEntry } =
            saveToLeaderboard(gameState, initials);

        if (ui.initialsForm) {
            ui.initialsForm.style.display = "none";
        }
        renderLeaderboard(ui, leaderboard, currentEntry);
    };
    if (ui.saveScoreButton) {
        ui.saveScoreButton.addEventListener(
            "click", handleScoreSubmit, { once: true }
        );
    }
    if (ui.initialsInput) {
        ui.initialsInput.addEventListener(
            "keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    ui.saveScoreButton.click();
                }
            }, { once: true }
        );
    }
    ui.dialog.showModal();
}