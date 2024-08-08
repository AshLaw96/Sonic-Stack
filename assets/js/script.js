// wait for DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", () => {
    const gameWrap = document.getElementById("game-wrap");
    // turns game divs into an array
    let blocks = Array.from(document.querySelectorAll("#game-wrap div"));
    const start = document.getElementById("start");
    const reset = document.getElementById("reset");
    let pause;
    let points = 0;
    const currentPoints = document.getElementById("point")

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

    let location = 2;
    let activeRotate = 0;

    let randBlock = Math.floor(Math.random() * blockArr.length);
    let active = blockArr[randBlock][activeRotate];
    
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
            active = blockArr[randBlock][activeRotate];
            location = 2;
            makeBlocks();
            gotPoints();
            lost();
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
        const stopR = active.some(i => (location + i) % 10 === 9);

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

    function turn() {
        removeBlocks();
        activeRotate ++;

        if (activeRotate === active.length) {
            activeRotate = 0;
        }

        active = blockArr[randBlock][activeRotate];
        makeBlocks();
    }

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

    // Makes blocks move down specific amount of seconds
    // function difficulty() {

    //     if (document.getElementById("easy")) { // easy mode        
    //         setInterval(down, 2000);
    //     } else if (document.getElementById("medium")) { // medium mode
    //         setInterval(down, 1000);
    //     } else if (document.getElementById("hard")) { // hard mode
    //         setInterval(down, 500);
    //     }
    // }

    // document.addEventListener("click", difficulty);

    pause = setInterval(down, 1000);

    start.addEventListener("click", () => {
        if (pause) {
            clearInterval(pause);
            pause = null;
        } else {
            makeBlocks();
            pause = setInterval(down, 1000);
        }
    });

    // function score() {
    //     let currentScore = parseInt(document.getElementById("point").innerText);
    //     document.getElementById("point").value = ++currentScore;
    // }

    function gotPoints() {
        for (let i = 0; i < 199; i += 10) {
            const line = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (line.every(i => blocks[i].classList.contains("delete"))) {
                points += 100;
                currentPoints.innerText = points;
                line.forEach(i => {
                    blocks[i].classList.remove("delete");
                    blocks[i].classList.remove("sqr");
                });

                const deleteBlock = blocks.splice(i, 10);
                blocks = deleteBlock.concat(blocks);
                blocks.forEach(square => gameWrap.appendChild(square));
            }
        }
    }
    
    function lost() {
        if (active.some(i => blocks[location + i].classList.contains("delete"))) {
            newGame();
            clearInterval(pause);
        }
    }

    function newGame() {
        const newStart = document.querySelector("[data-close-modal]");
        const modal = document.querySelector("[data-modal]");

        newStart.addEventListener("click", () => {
            modal.close();
        });
    }

});

