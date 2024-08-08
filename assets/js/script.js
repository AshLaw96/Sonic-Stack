// wait for DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", () => {
    const gameWrap = document.getElementById("game-wrap");
    // turns game divs into an array
    let blocks = Array.from(document.getElementsByClassName("game"));
    const start = document.getElementById("start");
    const reset = document.getElementById("reset");

    // Tetris blocks

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

    let location = 6;
    let locationRotate = 0;

    let randBlock = Math.floor(Math.random() * blockArr.length);
    let active = blockArr[randBlock][locationRotate];
    
    /**
     * creates the blocks
     */
    function makeBlocks() {
        active.forEach(i => {
            blocks[location + i].classList.add("sqr")
        });
    }
    /**
     * delete the blocks that have been created
     */
    function removeBlocks() {
        active.forEach(i => {
            blocks[location + i].classList.remove("sqr")
        });
    }

    /**
     * stops blocks running out of game area
     */
    function stop() {
        if (active.some(i => blocks[location + i + 10].classList.contains("delete"))) {
            active.forEach(i => blocks[location + i].classList.add("delete"));
            
            randBlock = Math.floor(Math.random() * blockArr.length);
            active = blockArr[randBlock][locationRotate];
            location = 6;
            makeBlocks();
        } 
    }

    // moving blocks
    function left() {
        removeBlocks();
        const stopL = active.some(i => (location + i) % 10 === 0);

        if (stopL === false) {
            location -= 1;
        }

        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            location += 1;
        }
        makeBlocks();
    }
    
    function right() {
        removeBlocks();
        const stopR = active.some(i => (location + 1) % 10 === 9);

        if (stopR === false) {
            location += 1;
        }

        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            location -= 1;
        }

        makeBlocks();
    }

    function down() {
        removeBlocks();
        location += 10;
        makeBlocks();
        stop();
    }

    function movement(event) {
        if (event.keyCode === 37) {
            left();
        } else if (event.keyCode === 39) {
            right();
        } else if (event.keyCode === 40) {
            down();
        } else if (event.keyCode === 32) {
            turn();
        }
    }

    document.addEventListener("keyup", movement);

    // Easy mode

    // Makes blocks move down every second
    function difficulty() {
        const easy = document.getElementById("easy");
        const medium = document.getElementById("medium");
        const hard = document.getElementById("hard");

        if (document.addEventListener("click", easy)) {
            setInterval(down, 3000);
        } else if (document.addEventListener("click", medium)) {
            setInterval(down, 2000);
        } else if (document.addEventListener("click", hard)) {
            setInterval(down, 1000);
        }
    }

    difficulty();


});

