import { 
    setMuted, 
    playSound, 
    audio 
} from "./audio.js";

/**
 * Formats a duration in milliseconds as 
 * "Xm Ys" (or just "Ys" if under a minute).
 */
export function formatPlayTime(ms) {

    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`;
}

export function renderGameStats(ui, gameState) {

    if (ui.statsLines) {
        ui.statsLines.textContent = 
            gameState.linesCleared;
    }
    if (ui.statsLevel) {
        ui.statsLevel.textContent = 
            gameState.level;
    }
    if (ui.statsTime) {
        ui.statsTime.textContent = 
            formatPlayTime(gameState.PlayTimeMs);
    }
}

/**
 * Renders the leaderboard into the Game
 * Over dialog, marking this run's entry.
 */
export function renderLeaderboard(
    ui,
    leaderboard,
    currentEntry
) {
    if (!ui.leaderboardList) {
        return;
    }
    ui.leaderboardList.innerHTML = "";

    leaderboard.forEach(entry => {

        const item = document.createElement("li");

        item.textContent = 
           `${entry.name || "AAA"} - ${
                entry.score.toLocaleString()
            } pts`;

        if (currentEntry && entry === currentEntry) {

            item.classList.add("current-score");
        }
        ui.leaderboardList.appendChild(item);
    });
}

/**
 * Closes the Game Over dialog.
 */
export function closeDialog(ui) {

    if (ui.dialog && ui.dialog.open) {
        ui.dialog.close();
    }
}

/**
 * Shows the hidden drone image.
 */
export function showHiddenDrone(ui) {

    if (!ui.drone) {
        return;
    }
    ui.drone.hidden = false;

    if (ui.droneText) {
        ui.droneText.hidden = true;
    }
}

export function toggleMute(gameState, ui) {

    gameState.isMuted =
        !gameState.isMuted;

    localStorage.setItem(
        "Muted",
        gameState.isMuted
    );
    setMuted(gameState.isMuted);

    ui.soundButton.style.backgroundColor =
        gameState.isMuted
            ? "var(--p-highlight)"
            : "var(--p-block3)";
}

/**
 * Plays the hidden Eggman sound.
 */
export function playEggman() {

    if (!audio.eggman) {
        return;
    }
    playSound(audio.eggman);
}

/**
 * Returns to the home page.
 */
export function goBack() {

    window.location.href = "index.html";
}

/**
 * Opens/closes the difficulty menu.
 */
export function toggleMenu(ui) {
 
    if (!ui.difficultyNav || !ui.menuToggle) {
        return;
    }
    const isOpen =
        ui.difficultyNav.classList.toggle("open");
 
    ui.menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );
}

/**
 * Applies a difficulty to the UI (buttons, background
 * , subtitle) and persists the choice.
 */
export function applyDifficulty(
    difficulty,
    ui,
    gameState
) {
    gameState.difficulty = difficulty;

    localStorage.setItem(
        "Difficulty",
        difficulty
    );
    [ui.easy, ui.medium, ui.hard].forEach(button => {
 
        if (button) {
            button.classList.remove("current");
        }
    });
    if (ui[difficulty]) {
        ui[difficulty].classList.add("current");
    }
    if (ui.mainWrap) {
        ui.mainWrap.classList.remove(
            "easy-bg",
            "medium-bg",
            "hard-bg"
        );
        ui.mainWrap.classList.add(
            `${difficulty}-bg`
        ); 
    }
    if (ui.subtitle) {
        ui.subtitle.textContent =
            difficulty.charAt(0).toUpperCase() +
            difficulty.slice(1); 
    }
}

/**
 * Wires up the hero section's zone cards:
 * picking one applies that difficulty
 * and starts the game.
 */
export function initialiseHero(ui, gameState) {

    if (!ui.hero || !ui.zoneButtons) {
        return;
    }
    ui.zoneButtons.forEach(button => {

        button.addEventListener("click", () => {
            const chosenDifficulty = button.dataset.difficulty;

            applyDifficulty(chosenDifficulty, ui, gameState);

            ui.hero.hidden = true;

            if (ui.mainWrap) {
                ui.mainWrap.hidden = false;
            }
        });
    });
}


/**
 * Registers all UI event listeners.
 */
export function initialiseUI(ui, gameState) {
 
    if (ui.soundButton) {
        ui.soundButton.addEventListener(
            "click",
            () => toggleMute(gameState, ui)
        );
    }
    if (ui.menuToggle) {
        ui.menuToggle.addEventListener(
            "click",
            () => toggleMenu(ui)
        ); 
    }
    [
        ["easy", ui.easy],
        ["medium", ui.medium],
        ["hard", ui.hard]
    ].forEach(([name, button]) => {
 
        if (button) {
            button.addEventListener(
                "click",
                () => {
 
                    applyDifficulty(
                        name,
                        ui,
                        gameState
                    );
                    toggleMenu(ui);
                }
            );
        }
    });
    /**
     * Sync the UI to whatever difficulty
     * was loaded without opening menu.
     */
    applyDifficulty(
        gameState.difficulty,
        ui,
        gameState
    );
    if (ui.eggButton) {
        ui.eggButton.addEventListener(
            "click",
            () => {
                playEggman();

                showHiddenDrone(ui);
            }
        );
    }
    if (ui.backButton) {
        ui.backButton.addEventListener(
            "click",
            goBack
        );
    }
}