/* jshint esversion: 11 */

document.addEventListener("DOMContentLoaded", init);

function init() {

    // ==========================================
    // Configuration
    // ==========================================

    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const CELL_COUNT = GRID_WIDTH * GRID_HEIGHT;
    const START_POSITION = 4;
    const POINTS_PER_LINE = 100;

    const BLOCK_COLORS = [
        "var(--p-block1)",
        "var(--p-block2)",
        "var(--p-block3)"
    ];

    const BLOCK_SHADOWS = {
        "var(--p-block2)": "0 0 4px 2px var(--s-block2)",
        "var(--p-block3)": "0 0 4px 2px var(--s-block3)"
    };

    // ==========================================
    // Tetromino Definitions
    // ==========================================

    const TETROMINOES = [

        {
            name: "O",

            color: BLOCK_COLORS[0],

            rotations: [
                [0, 1, 10, 11],
                [0, 1, 10, 11],
                [0, 1, 10, 11],
                [0, 1, 10, 11]
            ]
        },

        {
            name: "I",

            color: BLOCK_COLORS[1],

            rotations: [
                [1, 11, 21, 31],
                [10, 11, 12, 13],
                [1, 11, 21, 31],
                [10, 11, 12, 13]
            ]
        },

        {
            name: "T",

            color: BLOCK_COLORS[2],

            rotations: [
                [1, 10, 11, 12],
                [1, 11, 12, 21],
                [10, 11, 12, 21],
                [1, 10, 11, 21]
            ]
        },

        {
            name: "L",

            color: BLOCK_COLORS[0],

            rotations: [
                [1, 11, 21, 2],
                [10, 11, 12, 22],
                [1, 11, 21, 20],
                [10, 20, 21, 22]
            ]
        },

        {
            name: "Z",

            color: BLOCK_COLORS[1],

            rotations: [
                [0, 10, 11, 21],
                [12, 11, 20, 21],
                [0, 10, 11, 21],
                [12, 11, 20, 21]
            ]
        }

    ];


    // ==========================================
    // Active Piece State
    // ==========================================

    let currentPieceIndex = getRandomPiece();

    let active = TETROMINOES[currentPieceIndex].rotations[0];

    let nextPieceIndex = getRandomPiece();

    // ==========================================
    // Piece Utilities
    // ==========================================

    function getRandomPiece() {

        return Math.floor(
            Math.random() * TETROMINOES.length
        );

    }

    // ==========================================
    // UI Elements
    // ==========================================

    const ui = {
        gameBoard: document.getElementById("game-wrap"),

        start: document.getElementById("start-stop"),
        reset: document.getElementById("reset"),

        left: document.getElementById("left"),
        right: document.getElementById("right"),
        down: document.getElementById("down"),
        rotate: document.getElementById("twist"),

        easy: document.getElementById("easy"),
        medium: document.getElementById("medium"),
        hard: document.getElementById("hard"),

        mainWrap: document.getElementById("main-wrap"),

        currentScore: document.getElementById("point"),
        highScore: document.getElementById("high-scr"),

        rulesButton: document.getElementById("instructions"),
        rules: document.getElementById("rules"),

        subtitle: document.getElementById("sub-title"),

        dialog: document.querySelector("dialog"),
        closeDialog: document.getElementById("close-dial"),

        soundButton: document.getElementById("sound")
    };

    // ==========================================
    // Audio
    // ==========================================

    const audio = {
        greenHill: document.getElementById("green-hill"),
        labyrinth: document.getElementById("labyrinth"),
        boss: document.getElementById("boss"),

        score: document.getElementById("score-sound"),
        rotate: document.getElementById("turn-sound"),
        gameOver: document.getElementById("lost-sound"),

        eggman: document.getElementById("eggman")
    };

    // Mute all sounds on startup
    document.querySelectorAll("audio").forEach(sound => {
        sound.volume = 0;
    });

    // ==========================================
    // Build Game Board
    // ==========================================

    createBoard();

    const boardCells = Array.from(
        ui.gameBoard.querySelectorAll("div")
    );

    function createBoard() {

        for (let i = 0; i < CELL_COUNT; i++) {
            const cell = document.createElement("div");
            ui.gameBoard.appendChild(cell);
        }

        for (let i = 0; i < GRID_WIDTH; i++) {
            const floor = document.createElement("div");
            floor.classList.add("delete");
            ui.gameBoard.appendChild(floor);
        }
    }

    // ==========================================
    // Initial UI State
    // ==========================================

    if (ui.rules) {
        ui.rules.hidden = true;
    }

    // ==========================================
    // Game State
    // ==========================================

    const gameState = {
        score: 0,
        highScore: Number(localStorage.getItem("High-Score")) || 0,

        position: START_POSITION,
        rotation: 0,

        currentPiece: null,
        currentPieceIndex: 0,

        difficulty: "easy",

        dropInterval: null,

        isPaused: true,
        isMuted: true
    };

    ui.highScore.textContent = gameState.highScore;
    ui.currentScore.textContent = gameState.score;


   /**
 * Removes the current active tetromino from the board.
 */
function removeBlocks() {
    active.forEach(offset => {
        const cell = blocks[location + offset];

        cell.classList.remove("sqr");
        cell.style.backgroundColor = "";
        cell.style.boxShadow = "";
    });
}

/**
 * Updates the score display.
 */
function updateScore() {
    ui.currentScore.textContent = points;
}

/**
 * Returns a random tetromino index.
 */
function getRandomBlock() {
    return Math.floor(Math.random() * blockArr.length);
}

/**
 * Clears any completed lines and awards points.
 */
function gotPoints() {

    const completedRows = [];

    for (let row = 0; row < CELL_COUNT; row += GRID_WIDTH) {

        const currentRow = Array.from(
            { length: GRID_WIDTH },
            (_, index) => row + index
        );

        const isComplete = currentRow.every(index =>
            blocks[index].classList.contains("delete")
        );

        if (isComplete) {
            completedRows.push(row);
        }
    }

    if (completedRows.length === 0) {
        return;
    }

    completedRows.forEach(row => {

        for (let i = 0; i < GRID_WIDTH; i++) {

            const cell = blocks[row + i];

            cell.classList.remove("delete", "sqr");
            cell.style.backgroundColor = "";
            cell.style.boxShadow = "";
        }

        const removedRow = blocks.splice(row, GRID_WIDTH);
        blocks = removedRow.concat(blocks);
    });

    blocks.forEach(cell => ui.gameBoard.appendChild(cell));

    points += completedRows.length * 100;

    updateScore();

    audio.score.currentTime = 0;
    audio.score.play();
}

/**
 * Ends the game if a new piece cannot spawn.
 */
function lost() {

    const gameOver = active.some(offset =>
        blocks[location + offset].classList.contains("delete")
    );

    if (!gameOver) {
        return;
    }

    clearInterval(dropTime);

    const music = {
        easy: audio.greenHill,
        medium: audio.labyrinth,
        hard: audio.boss
    };

    music[currentDifficulty]?.pause();

    if (points > highScore) {

        highScore = points;

        localStorage.setItem("High-Score", highScore);

        ui.highScore.textContent = highScore;
    }

    audio.gameOver.currentTime = 0;
    audio.gameOver.play();

    ui.dialog.showModal();
}

/**
 * Closes the Game Over dialog.
 */
function closeDialog() {
    ui.dialog.close();
}

ui.closeDialog.addEventListener("click", closeDialog);

/**
 * Returns true if any part of the active piece
 * is touching the right edge.
 */
function stopRightTurn() {
    return active.some(offset =>
        (location + offset + 1) % GRID_WIDTH === 0
    );
}

/**
 * Returns true if any part of the active piece
 * is touching the left edge.
 */
function stopLeftTurn() {
    return active.some(offset =>
        (location + offset) % GRID_WIDTH === 0
    );
}

/**
 * Prevents pieces wrapping around the board while rotating.
 */
function stopTurning() {

    while ((location + 1) % GRID_WIDTH < GRID_WIDTH / 2 && stopRightTurn()) {
        location++;
    }

    while (location % GRID_WIDTH > (GRID_WIDTH / 2) - 1 && stopLeftTurn()) {
        location--;
    }
}

/**
 * Locks the current tetromino in place
 * and spawns the next one.
 */
function stop() {

    active.forEach(offset => {
        blocks[location + offset].classList.add("delete");
    });

    randBlock = getRandomBlock();
    activeRotate = 0;
    active = blockArr[randBlock][activeRotate];

    location = START_POSITION;

    gotPoints();

    makeBlocks();

    stopTurning();

    lost();
}

/**
 * Moves the active tetromino left.
 */
function left() {

    removeBlocks();

    const touchingLeftWall = active.some(offset =>
        (location + offset) % GRID_WIDTH === 0
    );

    if (!touchingLeftWall) {
        location--;
    }

    const hitLockedBlock = active.some(offset =>
        blocks[location + offset].classList.contains("delete")
    );

    if (hitLockedBlock) {
        location++;
    }

    makeBlocks();
}

ui.left.addEventListener("click", left);
    
  /**
 * Moves the active tetromino right.
 */
function right() {

    removeBlocks();

    const touchingRightWall = active.some(offset =>
        (location + offset) % GRID_WIDTH === GRID_WIDTH - 1
    );

    if (!touchingRightWall) {
        location++;
    }

    const hitLockedBlock = active.some(offset =>
        blocks[location + offset].classList.contains("delete")
    );

    if (hitLockedBlock) {
        location--;
    }

    makeBlocks();
}

ui.right.addEventListener("click", right);

/**
 * Moves the active tetromino down.
 */
function down() {

    const canMoveDown = !active.some(offset =>
        blocks[location + offset + GRID_WIDTH].classList.contains("delete")
    );

    if (canMoveDown) {

        removeBlocks();

        location += GRID_WIDTH;

        makeBlocks();

    } else {

        stop();

    }
}

ui.down.addEventListener("click", down);

/**
 * Rotates the active tetromino.
 */
function turn() {

    removeBlocks();

    activeRotate++;

    if (activeRotate >= active.length) {
        activeRotate = 0;
    }

    active = blockArr[randBlock][activeRotate];

    stopTurning();

    makeBlocks();

    audio.rotate.currentTime = 0;
    audio.rotate.play();
}

ui.rotate.addEventListener("click", turn);

/**
 * Handles keyboard controls.
 */
function movement(event) {

    switch (event.code) {

        case "ArrowLeft":
            left();
            break;

        case "ArrowRight":
            right();
            break;

        case "ArrowDown":
            down();
            break;

        case "Space":
            event.preventDefault();
            turn();
            break;
    }
}

document.addEventListener("keydown", movement);

/**
 * Changes the current difficulty.
 */
function setDifficulty(level) {

    currentDifficulty = level;

    ui.subtitle.textContent =
        level.charAt(0).toUpperCase() + level.slice(1);

    ui.mainWrap.classList.remove(
        "easy-bg",
        "medium-bg",
        "hard-bg"
    );

    ui.mainWrap.classList.add(`${level}-bg`);

    ui.easy.classList.toggle("current", level === "easy");
    ui.medium.classList.toggle("current", level === "medium");
    ui.hard.classList.toggle("current", level === "hard");

    clearInterval(dropTime);

    audio.greenHill.pause();
    audio.labyrinth.pause();
    audio.boss.pause();

    restart();
}

ui.easy.addEventListener("click", () => setDifficulty("easy"));
ui.medium.addEventListener("click", () => setDifficulty("medium"));
ui.hard.addEventListener("click", () => setDifficulty("hard"));

    /**
 * Prevents the browser from scrolling
 * while using the keyboard controls.
 */
function stopScroll(event) {

    const blockedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space"
    ];

    if (blockedKeys.includes(event.code)) {
        event.preventDefault();
    }
}

/**
 * Starts the game loop.
 */
function startGame() {

    const settings = {
        easy: {
            music: audio.greenHill,
            interval: 1000
        },
        medium: {
            music: audio.labyrinth,
            interval: 500
        },
        hard: {
            music: audio.boss,
            interval: 200
        }
    };

    const { music, interval } = settings[currentDifficulty];

    music.currentTime = 0;
    music.play();

    dropTime = setInterval(down, interval);

    window.addEventListener("keydown", stopScroll);
}

/**
 * Stops the game loop.
 */
function stopGame() {

    clearInterval(dropTime);

    dropTime = null;

    audio.greenHill.pause();
    audio.labyrinth.pause();
    audio.boss.pause();

    window.removeEventListener("keydown", stopScroll);
}

/**
 * Toggles between playing and paused.
 */
function pausePlay() {

    if (dropTime) {

        stopGame();

    } else {

        startGame();

    }
}

ui.start.addEventListener("click", pausePlay);

/**
 * Restarts the current game.
 */
function restart() {

    for (let i = 0; i < CELL_COUNT; i++) {

        const cell = blocks[i];

        cell.classList.remove("delete", "sqr");
        cell.style.backgroundColor = "";
        cell.style.boxShadow = "";
    }

    points = 0;
    location = START_POSITION;
    activeRotate = 0;

    updateScore();

    stopGame();

    randBlock = getRandomBlock();
    active = blockArr[randBlock][activeRotate];

    makeBlocks();
}

ui.reset.addEventListener("click", restart);

/**
 * Shows or hides the rules.
 */
function toggleRules() {

    ui.rules.hidden = !ui.rules.hidden;
}

ui.rulesButton.addEventListener("click", toggleRules);

/**
 * Shows the hidden drone image.
 */
function hideDrone() {

    if (!drone) {
        return;
    }

    drone.hidden = false;

    if (droneTxt) {
        droneTxt.hidden = true;
    }
}

/**
 * Toggles game audio.
 */
function muteUnmute() {

    const muted = audio.greenHill.volume === 0;

    document.querySelectorAll("audio").forEach(sound => {
        sound.volume = muted ? 1 : 0;
    });

    ui.soundButton.style.backgroundColor = muted
        ? "var(--p-block3)"
        : "var(--p-highlight)";
}

ui.soundButton.addEventListener("click", muteUnmute);

/**
 * Plays the hidden Eggman sound.
 */
function playEgg() {

    if (!audio.eggman) {
        return;
    }

    audio.eggman.currentTime = 0;
    audio.eggman.play();
}

if (eggBtn) {

    eggBtn.addEventListener("click", () => {

        playEgg();

        hideDrone();

    });

}

/**
 * Returns to the home page.
 */
function goBack() {

        window.location.href = "index.html";
    }

    if (backBtn) {

        backBtn.addEventListener("click", goBack);

    }

}
