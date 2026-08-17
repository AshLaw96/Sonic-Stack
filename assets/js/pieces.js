/**
 * Tetromino definitions and helpers.
 */

export const TETROMINOES = [

    {
        name: "Square",

        color: "var(--p-block1)",

        shadow: "0 0 4px 2px var(--s-block1)",

        glow: "var(--s-block1)",

        rotations: [

            [0, 1, 10, 11],
            [0, 1, 10, 11],
            [0, 1, 10, 11],
            [0, 1, 10, 11]

        ]

    },

    {
        name: "Line",

        color: "var(--p-block2)",

        shadow: "0 0 4px 2px var(--s-block2)",

        glow: "var(--s-block2)",

        rotations: [

            [1, 11, 21, 31],
            [10, 11, 12, 13],
            [1, 11, 21, 31],
            [10, 11, 12, 13]

        ]

    },

    {
        name: "T",

        color: "var(--p-block3)",

        shadow: "0 0 4px 2px var(--s-block3)",

        glow: "var(--s-block3)",

        rotations: [

            [1, 10, 11, 12],
            [1, 11, 12, 21],
            [10, 11, 12, 21],
            [1, 10, 11, 21]

        ]

    },

    {
        name: "L",

        color: "var(--p-block1)",

        shadow: "0 0 4px 2px var(--s-block1)",

        glow: "var(--s-block1)",

        rotations: [

            [1, 11, 21, 2],
            [10, 11, 12, 22],
            [1, 11, 21, 20],
            [10, 20, 21, 22]

        ]

    },

    {
        name: "Z",

        color: "var(--p-block2)",

        shadow: "0 0 4px 2px var(--s-block2)",

        glow: "var(--s-block2)",

        rotations: [

            [0, 10, 11, 21],
            [11, 12, 20, 21],
            [0, 10, 11, 21],
            [11, 12, 20, 21]

        ]

    }

];

/**
 * Returns a random tetromino index.
 */
export function getRandomPiece() {

    return Math.floor(
        Math.random() * TETROMINOES.length
    );
}

/**
 * Returns a tetromino by index.
 */
export function getPiece(index) {

    return TETROMINOES[index];
}

/**
 * Returns a rotation for a tetromino.
 */
export function getRotation(index, rotation) {

    return TETROMINOES[index]
        .rotations[rotation];
}

/**
 * Returns the number of
 * rotations a tetromino has.
 */
export function getRotationCount(index) {

    return TETROMINOES[index]
        .rotations.length;
}

/**
 * Returns the colour for
 * a tetromino.
 */
export function getPieceColour(index) {

    return TETROMINOES[index]
        .color;
}

/**
 * Returns the shadow for
 * a tetromino.
 */
export function getPieceShadow(index) {

    return TETROMINOES[index]
        .shadow;
}