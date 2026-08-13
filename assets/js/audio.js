/**
 * Audio manager.
 */

export const audio = {

    greenHill:
        document.getElementById("green-hill"),

    labyrinth:
        document.getElementById("labyrinth"),

    boss:
        document.getElementById("boss"),

    rotate:
        document.getElementById("turn-sound"),

    score:
        document.getElementById("score-sound"),

    gameOver:
        document.getElementById("lost-sound"),

    eggman:
        document.getElementById("eggman")

};

/**
 * Sets the volume for every sound.
 */
export function setMuted(isMuted) {

    const volume = isMuted ? 0 : 1;

    Object.values(audio)
        .filter(Boolean)
        .forEach(sound => {

            sound.volume = volume;

        });

}

/**
 * Plays an audio clip.
 */
export function playSound(sound) {

    if (!sound) {
        return;
    }

    sound.currentTime = 0;
    sound.play();

}

/**
 * Pauses an audio clip.
 */
export function pauseSound(sound) {

    if (!sound) {
        return;
    }

    sound.pause();

}

/**
 * Stops an audio clip.
 */
export function stopSound(sound) {

    if (!sound) {
        return;
    }

    sound.pause();
    sound.currentTime = 0;

}

/**
 * Stops all background music.
 */
export function stopMusic() {

    stopSound(audio.greenHill);
    stopSound(audio.labyrinth);
    stopSound(audio.boss);

}

/**
 * Plays the music for the
 * selected difficulty.
 */
export function playMusic(difficulty) {

    stopMusic();

    const tracks = {

        easy: audio.greenHill,
        medium: audio.labyrinth,
        hard: audio.boss

    };

    playSound(
        tracks[difficulty]
    );

}