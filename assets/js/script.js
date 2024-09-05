/* jshint esversion: 11 */
// wait for DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", () => {
    // creates the game area
    const gameWrap = document.getElementById("game-wrap");
    for (let i = 0; i < 200; ++i) {
        if (gameWrap) {
            const div = document.createElement("div");
            gameWrap.appendChild(div);
        }
    }
    for (let i = 0; i < 10; ++i) {
        if (gameWrap) {
            const div = document.createElement("div");
            div.classList.add("delete");
            gameWrap.appendChild(div);
        }
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
    const backBtn = document.getElementById("return");

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
    const drone = document.getElementById("drone");
    const droneTxt = document.getElementById("drone-txt");
    if (drone) {
        drone.style.display = "none";
    }
    // Sounds
    const soundWrap = document.getElementById("sound-wrap");
    const soundWrapChildren = soundWrap.children;
    let soundArr = [];
    for (let i = 0; i < soundWrapChildren.length; ++i) {
        soundArr.push(soundWrapChildren[i]);
    }
    const soundBtn = document.getElementById("sound");
    const allAudio = document.getElementsByTagName("audio");
    for (let i = 0; i < allAudio.length; ++i) {
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

    const subTitle = document.getElementById("sub-title");
    // dialog section
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

    let location = 4;
    let activeRotate = 0;

    // picks random block and a random rotation of the block
    let randBlock = Math.floor(Math.random() * blockArr.length);
    let active = blockArr[randBlock][activeRotate];
    
    /**
     * creates the blocks by adding the style from CSS
     * adds random colours to the blocks
     */
    function makeBlocks() {
        const shadows = {
            "var(--p-block2)": "0 0 4px 2px var(--s-block2)",
            "var(--p-block3)": "0 0 4px 2px var(--s-block3)"
        };
    
        active.forEach(i => {
            blocks[location + i].classList.add("sqr");
            blocks[location + i].style.backgroundColor = clrArr[randBlock];
    
            // Set boxShadow based on color if it exists in shadows 
            blocks[location + i].style.boxShadow = shadows[clrArr[randBlock]] || "";
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
     * if full, remove the full line and all styles
     * add 100 points every time full line is cleared
     */
    function gotPoints() {
        let deleteLines = [];
    
        const fullLine = y => blocks[y].classList.contains("delete");
    
        for (let i = 0; i < 199; i += 10) {
            const line = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
    
            if (line.every(fullLine)) {
                points += 100;
                currentPoints.innerText = points;
                deleteLines.push(i); // Collect the start index of the line to delete
            }
        }
    
        // Now, delete all the lines that were fully completed
        deleteLines.forEach(start => {
            for (let j = 0; j < 10; ++j) {
                blocks[start + j].classList.remove("delete", "sqr");
                blocks[start + j].style.backgroundColor = "";
                blocks[start + j].style.boxShadow = "";
            }
    
            const deleteBlock = blocks.splice(start, 10); // remove full line from the blocks
            blocks = deleteBlock.concat(blocks); // add deleteBlock to blocks variable
        });
    
        blocks.forEach(square => gameWrap.appendChild(square)); // add each as child of gameWrap
        if (deleteLines.length > 0) {
            scrSound.play();
        }
    }

    /**
     * checks if Tetris block reach top of game area
     * if true stops Tetris blocks dropping
     * stops main sounds play lost sound
     * shows the dialog
     */
    function lost() {
        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            clearInterval(dropTime);
    
            const bgSongs = {
                "Easy": greenHill,
                "Medium": labSound,
                "Hard": bossSound
            };
            
            const currentSound = bgSongs[subTitle.textContent];
            if (currentSound) currentSound.pause();
    
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
            if ((location + 1) % 10 < 5 && stopRightTurn()) {
                   ++location;
                   stopTurning();
            } else if (location % 10 > 4 && stopLeftTurn()) {
                     --location;
                     stopTurning();
              }
        }

    /**
     * stops blocks running out of bottom of game area
     * stops blocks reaching the delete divs
     */
    function stop() {
            active.forEach(i => blocks[location + i].classList.add("delete"));
            // starts another random block dropping
            randBlock = Math.floor(Math.random() * blockArr.length);
            active = blockArr[randBlock][activeRotate];
            location = 4;
            gotPoints();
            makeBlocks();
            stopTurning();
            lost();
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
            --location;
        }
        // if block reached delete div add to location then drop another block
        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            ++location;
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
            ++location;
        }

        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            --location;
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
        // allows to move blocks before stop at bottom
        if (!active.find(i => blocks[location + i + 10].classList.contains("delete"))) {
            removeBlocks();
            location += 10;
            makeBlocks();
        } else {
            stop();
        }
    }

    if (downMove) {
        downMove.addEventListener("click", down);
    }

    /**
     * rotates block through each position
     */
    function turn() {
        removeBlocks();
        ++activeRotate;
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
     * access key board codes by names
     * makes tetris block move when specific key pressed
     */
    function movement(event) {
        if (event.code === "ArrowLeft") { // left arrow
            left();
        } else if (event.code === "ArrowRight") { // right arrow
            right();
        } else if (event.code === "ArrowDown") { // down arrow
            down();
        } else if (event.code === "Space") { // space bar
            turn();
        }
    }

    document.addEventListener("keydown", movement);

     //easy level change
     function easyChange() {
        subTitle.innerText = "Easy";
        mainWrap.classList.add("easy-bg");
        mainWrap.classList.remove("medium-bg", "hard-bg");
        easyBtn.classList.add("current");
        medBtn.classList.remove("current");
        hardBtn.classList.remove("current");
        clearInterval(dropTime);
        labSound.pause();
        bossSound.pause();
    }

    if (easyBtn) {
        easyBtn.addEventListener("click", () => {
            easyChange();
            restart();
        }); 
    }

    //medium level change
    function medChange() {
        subTitle.innerText = "Medium";
        mainWrap.classList.add("medium-bg");
        mainWrap.classList.remove("easy-bg", "hard-bg");
        medBtn.classList.add("current");
        easyBtn.classList.remove("current");
        hardBtn.classList.remove("current");
        clearInterval(dropTime);
        greenHill.pause();
        bossSound.pause();
    }

    if (medBtn) {
        medBtn.addEventListener("click", () => {
            medChange();
            restart();
        });
    }

    // hard level change
    function hardChange() {
        subTitle.innerText = "Hard";
        mainWrap.classList.add("hard-bg");
        mainWrap.classList.remove("medium-bg", "easy-bg");
        hardBtn.classList.add("current");
        medBtn.classList.remove("current");
        easyBtn.classList.remove("current");
        clearInterval(dropTime);
        greenHill.pause();
        labSound.pause();
    }

    if (hardBtn) {
        hardBtn.addEventListener("click", () => {
            hardChange();
            restart();
        });
    }

    /**
     * Checks specified keys been clicked
     * Then cancels event
     */
    function stopScroll(event) {
        switch(event.code){
            case "ArrowUp": 
            case "ArrowDown": 
            case "ArrowLeft": 
            case "ArrowRight": 
            case "Space": 
            event.preventDefault(); break;
            default:
        }
    }

    /**
     * pauses the drop of blocks when button is pressed
     * pauses all bg sounds
     * starts drop when button is pressed again
     * calls levelChange function when pressed again
     */
    function pausePlay() {
        if (dropTime) {
            clearInterval(dropTime);
            dropTime = null;
            [greenHill, labSound, bossSound].forEach(sound => sound.pause());
            // removes event listener allowing keyboard buttons to move screen
            window.removeEventListener("keydown", stopScroll, false);
        } else {
            levelChange(subTitle.textContent);
             // adds event listener stopping keyboard buttons to move screen
            window.addEventListener("keydown", stopScroll, false);
        }
    }
    
    /**
     * Allows drop time, sound and mode to change
     * Changes each depending on level 
     */ 
    function levelChange(level) {
        const levelSettings = {
            "Easy": { change: easyChange, sound: greenHill, interval: 1000 },
            "Medium": { change: medChange, sound: labSound, interval: 500 },
            "Hard": { change: hardChange, sound: bossSound, interval: 200 }
        };
    
        const { change, sound, interval } = levelSettings[level];
        change();
        sound.play();
        dropTime = setInterval(down, interval);
    }
    

    if (startBtn) {
        startBtn.addEventListener("click", pausePlay);
    }

    /**
     * Removes all blocks
     * stops blocks dropping
     * sets points to 0
     */
    function restart() {
        for (let i = 0; i < 200; ++i) {
            blocks[i].classList.remove("delete", "sqr");
            blocks[i].style.backgroundColor = "";
            blocks[i].style.boxShadow = "";
        }
        location = 4;
        currentPoints.innerText = 0;
        points = 0;
        clearInterval(dropTime);
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

    // hide icon and un-hide img
    function hideDrone() {
        if (drone.style.display === "none") {
            drone.style.display = "block";
            droneTxt.style.display = "none";
        }
    }

    /**
     * loops all audio
     * if volume is above 0 all audio equals 0
     * if not all audio equals 1
    */
    function muteUnmute() {
        for (let i = 0; i < allAudio.length; ++i) {
            if (allAudio[i].volume > 0) {
                allAudio[i].volume = 0;
                soundBtn.style.backgroundColor = "var(--p-highlight)";
            } else {
                allAudio[i].volume = 1;
                soundBtn.style.backgroundColor = "var(--p-block3)";
            }
        }
    }

    soundBtn.addEventListener("click", muteUnmute);

    // 404 section
    function playEgg() {
        eggSound.play();
    }

    if (eggBtn) {
        eggBtn.addEventListener("click", () => {
            playEgg();
            hideDrone();
        });
    }

    function goBack() {
        window.location.href = "index.html";
    }

    if (backBtn) {
        backBtn.addEventListener("click", goBack);
    }
});