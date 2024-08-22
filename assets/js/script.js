// wait for DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", () => {
    // creates the game area
    const gameWrap = document.getElementById("game-wrap");
    for (let i = 0; i < 200; i += 1) {
        const div = document.createElement("div");
        gameWrap.appendChild(div);
    }
    for (let i = 0; i < 10; i += 1) {
        const div = document.createElement("div");
        div.classList.add("delete");
        gameWrap.appendChild(div);
    }
    // turns game divs into an array
    let blocks = Array.from(document.querySelectorAll("#game-wrap div"));
    // start and reset buttons
    const startBtn = document.getElementById("start-stop");
    const reset = document.getElementById("reset");
    // movement buttons
    const leftMove = document.getElementById("left");
    const rightMove = document.getElementById("right");
    const twistMove = document.getElementById("twist");
    const downMove = document.getElementById("down");
    // Navigation buttons
    const easyBtn = document.getElementById("easy");
    const medBtn = document.getElementById("medium");
    const hardBtn = document.getElementById("hard");

    let currentLevel = "Easy";
    let mainWrap = document.getElementById("main-wrap");
    // Scores
    const currentHigh = document.getElementById("high-scr");
    const highScore = localStorage.getItem("High-Score");
    if (currentHigh) {
        currentHigh.innerText = highScore;
    }
    const currentPoints = document.getElementById("point");
    let points = 0;
    // Hide variables
    const ruleBtn = document.getElementById("instructions");
    let ruleHide = document.getElementById("rules");
    if (ruleHide) {
        ruleHide.style.display = "none";
    }
    // Sounds
    const soundWrap = document.getElementById("sound-wrap");
    const soundWrapChildren = soundWrap.children;
    let soundArr = [];
    for (let i = 0; i < soundWrapChildren.length; i += 1) {
        soundArr.push(soundWrapChildren[i]);
    }
    const soundBtn = document.getElementById("sound");
    const allAudio = document.getElementsByTagName("audio");
    for (let i = 0; i < allAudio.length; i += 1) {
        allAudio[i].volume = 0;
    }
    const greenHill = document.getElementById("green-hill");
    const labSound = document.getElementById("labyrinth");
    const bossSound = document.getElementById("boss");
    const turnSound = document.getElementById("turn-sound");
    const scrSound = document.getElementById("score-sound");
    const lostSound = document.getElementById("lost-sound");
    const eggSound = document.getElementById("eggman");
    const eggBtn = document.getElementById("eggman-btn");
    const backBtn = document.getElementById("return");
    const subTitle = document.getElementById("sub-title");

    const dialog = document.querySelector("dialog");
    const dialClose = document.querySelector("#close-dial");

    let dropTime;
    // colour array
    const clrArr = ["var(--p-block1)", "var(--p-block2)", "var(--p-block3)"];

    //makes square Tetris block in each position
    const blockSqr = [
        [0, 1, 10, 10 + 1], 
        [0, 1, 10, 10 + 1], 
        [0, 1, 10, 10 + 1], 
        [0, 1, 10, 10 + 1]
    ];

    // makes line Tetris block in each position
    const blockLine = [
        [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1], 
        [10, 10 + 1, 10 + 2, 10 + 3], 
        [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1], 
        [10, 10 + 1, 10 + 2, 10 + 3]
    ];

    // makes T Tetris block in each position
    const blockT = [
        [1, 10, 10 + 1, 10 + 2], 
        [1, 10 + 1, 10 + 2, 10 * 2 + 1], 
        [10, 10 + 1, 10 + 2, 10 * 2 + 1], 
        [1, 10, 10 + 1, 10 * 2 + 1]
    ];

    // makes L Tetris block in each position
    const blockL = [
        [1, 10 + 1, 10 * 2 + 1, 2], 
        [10, 10 + 1, 10 + 2, 10 * 2 + 2], 
        [1, 10 + 1, 10 * 2 + 1, 10 * 2], 
        [10, 10 * 2, 10 * 2 + 1, 10 * 2 + 2]
    ];

    // makes Z Tetris block in each position
    const blockZ = [
        [0, 10, 10 + 1, 10 * 2 + 1], 
        [10 + 1, 10 + 2, 10 * 2, 10 * 2 + 1], 
        [0, 10, 10 + 1, 10 * 2 + 1], 
        [10 + 1, 10 + 2, 10 * 2, 10 * 2 + 1]
    ];

    // add block shapes to an array
    const blockArr = [blockSqr, blockLine, blockT, blockL, blockZ];

    let location = 3;
    let activeRotate = 0;

    // picks random block and a random rotation of the block
    let randBlock = Math.floor(Math.random() * blockArr.length);
    let active = blockArr[randBlock][activeRotate];
    
    /**
     * creates the blocks by adding the style from CSS
     * adds random colours to the blocks
     */
    function makeBlocks() {
        active.forEach(i => {
            blocks[location + i].classList.add("sqr");
            blocks[location + i].style.backgroundColor = clrArr[randBlock];
            if (blocks[location + i].style.backgroundColor === "var(--p-block2)") {
                blocks[location + i].style.boxShadow = "0 0 4px 2px var(--s-block2)";
            } else if (blocks[location + i].style.backgroundColor === "var(--p-block3)") {
                blocks[location + i].style.boxShadow = "0 0 4px 2px var(--s-block3)"; 
            } else {
                blocks[location + i].style.boxShadow = "0 0 4px 2px var(--s-block1)";
            }
        });
    }

    /**
     * delete the blocks that have been created
     * deletes all styling
     */
    function removeBlocks() {
        active.forEach(i => {
            blocks[location + i].classList.remove("sqr");
            blocks[location + i].style.backgroundColor = "";
            blocks[location + i].style.boxShadow = "";
        });
    }

    /**
     * checks if full width of game area is full
     * if full remove the full line and all styles
     * add 100 points every time full line 
     */
    function gotPoints() {
        for (let i = 0; i < 199; i += 10) {
            const line = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (line.every(j => blocks[j].classList.contains("delete"))) {
                points += 100;
                currentPoints.innerText = points;
                line.forEach(x => {
                    blocks[x].classList.remove("delete");
                    blocks[x].classList.remove("sqr");
                    blocks[x].style.backgroundColor = "";
                    blocks[x].style.boxShadow = "";
                });

                const deleteBlock = blocks.splice(i, 10); // remove full line from the blocks
                blocks = deleteBlock.concat(blocks); // add deleteBlock to blocks variable
                blocks.forEach(square => gameWrap.appendChild(square)); // add each as child of gameWrap
                scrSound.play();
            }
        }
    }

    /**
     * checks if Tetris block reach top of game area
     * if true stops Tetris blocks dropping
     * stops main sounds play lost sound
     * shows the dialog
     */
    function lost() {
        if (active.find(i => blocks[location + i].classList.contains("delete"))) {
            clearInterval(dropTime);
            if (subTitle.textContent === "Easy") {
                greenHill.pause();
            } else if (subTitle.textContent === "Medium") {
                labSound.pause();
            } else {
                bossSound.pause();
            }
            if (points > highScore) {
                localStorage.setItem("High-Score", points);
                currentHigh.innerText = points;
            }
            lostSound.play();
            dialog.showModal();
        }
    }

    // dialog can close by click button
    function closeDialog() {
        dialog.close();
    }

    if (dialClose) {
        dialClose.addEventListener("click", closeDialog);
    }

    /**
     * stops blocks running out of bottom of game area
     * stops blocks reaching the delete divs
     * 
     */
    function stop() {
        if (active.find(i => blocks[location + i + 10].classList.contains("delete"))) {
            active.forEach(i => blocks[location + i].classList.add("delete"));
            // starts another random block dropping
            randBlock = Math.floor(Math.random() * blockArr.length);
            active = blockArr[randBlock][activeRotate];
            location = 3;
            makeBlocks();
            gotPoints();
            lost();
        } 
    }

    /**
     * moves tetris block left
     * stops going left at edge of game area
     */
    function left() {
        removeBlocks();
        const stopL = active.some(i => (location + i) % 10 === 0);
        // if above variable wrong, minus block location (move right 1)
        if (stopL === false) {
            location -= 1;
        }
        // if block reached delete div add to location then drop another block
        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            location += 1;
        }
        makeBlocks();
    }

    if (leftMove) {
        leftMove.addEventListener("click", left);
    }
    
    /**
     * moves tetris block right
     * stops going right at edge of game area 
     */
    function right() {
        removeBlocks();
        const stopR = active.some(i => (location + i) % 10 === 9);
        // if above variable wrong, add to block location (move left 1)
        if (stopR === false) {
            location += 1;
        }

        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            location -= 1;
        }

        makeBlocks();
    }

    if (rightMove) {
        rightMove.addEventListener("click", right);
    }

    /**
     * moves tetris block down
     * repeats block when reach bottom of game area
     * stop block drop if reach top (stop func)
     */
    function down() {
        removeBlocks();
        location += 10;
        makeBlocks();
        stop();
    }

    if (downMove) {
        downMove.addEventListener("click", down);
    }

    /**
     * finds first block that reaches right side 
     */
    function stopRightTurn() {
        return active.find(i => (location + i + 1) % 10 === 0);
    }

    /**
     * finds first block that reaches left side  
     */
    function stopLeftTurn() {
        return active.find(i => (location + i) % 10 === 0);
    }

    /**
     * checks if block is turning at either side of game area
     * if at right adds 1 to location to wrap back around
     * if at left side takes 1 away from location to wrap back around
     */
    function stopTurning() {
        if ((location + 1) % 10 < 4 && stopRightTurn()) {
               location += 1;
               stopTurning();
        } else if (location % 10 > 4 && stopLeftTurn()) {
                 location -= 1;
                 stopTurning();
          }
    }

    /**
     * rotates block through each position
     */
    function turn() {
        removeBlocks();
        activeRotate += 1;
        turnSound.play();
        // if number of rotation is same as array length start again
        if (activeRotate === active.length) {
            activeRotate = 0;
        }

        active = blockArr[randBlock][activeRotate];
        stopTurning();
        makeBlocks();
    }

    if (twistMove) {
        twistMove.addEventListener("click", turn);
    }

    /**
     * access key board codes
     * makes tetris block move when specific key pressed
     */
    function movement(event) {
        if (event.keyCode === 37) { // left arrow
            left();
        } else if (event.keyCode === 39) { // right arrow
            right();
        } else if (event.keyCode === 40) { // down arrow
            down();
        } else if (event.keyCode === 32) { // space bar
            turn();
        }
    }

    document.addEventListener("keydown", movement);

    /**
     * pauses the drop of blocks when button is pressed
     * starts drop when button is pressed again
     */
    function pausePlay() {
        if (dropTime) {
            clearInterval(dropTime);
            dropTime = null;
            greenHill.pause();
            labSound.pause();
            bossSound.pause();
        } else {
            switch (subTitle.textContent) {
                case "Medium":
                    medChange();
                    labSound.play();
                    dropTime = setInterval(down, 500);
                    break;
                case "Hard":
                    hardChange();
                    bossSound.play();
                    dropTime = setInterval(down, 200);
                    break;
                default:
                    easyChange();
                    greenHill.play();
                    dropTime = setInterval(down, 1000);
            }
        }
    }

    if (startBtn) {
        startBtn.addEventListener("click", pausePlay);
    }

    function restart() {
        for (let i = 0; i < 200; i += 1) {
            blocks[i].classList.remove("delete");
            blocks[i].classList.remove("sqr");
            blocks[i].style.backgroundColor = "";
            blocks[i].style.boxShadow = "";
            location = 3;
            currentPoints.innerText = 0;
            clearInterval(dropTime);
        }
    }

    if (reset) {
        reset.addEventListener("click", restart);
    }

    // hide and un-hide rule text
    function rules() {
        if (ruleHide.style.display === "none") {
            ruleHide.style.display = "block";
        } else {
            ruleHide.style.display = "none"; 
        }
    }

    if (ruleBtn) {
        ruleBtn.addEventListener("click", rules);
    }

    /**
     * loops all audio
     * if volume is above 0 all audio equals 0
     * if not all audio equals 1
    */
    function muteUnmute() {
        for (let i = 0; i < allAudio.length; i += 1) {
            if (allAudio[i].volume > 0) {
                allAudio[i].volume = 0;
                soundBtn.style.backgroundColor = "var(--p-highlight)";
            } else {
                allAudio[i].volume = 1;
                soundBtn.style.backgroundColor = "var(--p-block3)";
            }
        }
    }

    if (soundBtn) {
        soundBtn.addEventListener("click", muteUnmute);
    }
    
    //easy level change
    function easyChange() {
        subTitle.innerText = "Easy";
        currentLevel = "Easy";
        mainWrap.classList.add("easy-bg");
        mainWrap.classList.remove("medium-bg", "hard-bg");
        clearInterval(dropTime);
        labSound.pause();
        bossSound.pause();
    }

    if (easyBtn) {
        easyBtn.addEventListener("click", easyChange);
    }

    //medium level change
    function medChange() {
        subTitle.innerText = "Medium";
        currentLevel = "Medium";
        mainWrap.classList.add("medium-bg");
        mainWrap.classList.remove("easy-bg", "hard-bg");
        clearInterval(dropTime);
        greenHill.pause();
        bossSound.pause();
    }

    if (medBtn) {
        medBtn.addEventListener("click", medChange);
    }

    // hard level change
    function hardChange() {
        subTitle.innerText = "Hard";
        currentLevel = "Hard";
        mainWrap.classList.add("hard-bg");
        mainWrap.classList.remove("medium-bg", "easy-bg");
        clearInterval(dropTime);
        greenHill.pause();
        labSound.pause();
    }

    if (hardBtn) {
        hardBtn.addEventListener("click", hardChange);
    }

    // 404 section
    function playEgg() {
        eggSound.play();
    }

    if (eggBtn) {
        eggBtn.addEventListener("click", playEgg);
    }

    function goBack() {
        history.back();
    }

    if (backBtn) {
        backBtn.addEventListener("click", goBack);
    }
});