/**
 * Attaches swipe and tap gesture listeners
 * to the game area.
 */
export function initTouchControls(gameContainer, handlers) {
    if (!gameContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const SWIPE_THRESHOLD = 30; // Minimum px distance to count as swipe
    const TAP_TIMEOUT = 250; // Max ms to count as tap

    gameContainer.addEventListener(
        "touchstart",
        (event) => {
            if (event.touches.length === 1) {
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
                touchStartTime = Date.now();
            }
        },
        { passive: false }
    );

    gameContainer.addEventListener(
        "touchmove",
        (event) => {
            event.preventDefault();
        },
        { passive: false }
    );

    gameContainer.addEventListener(
        "touchend",
        (event) => {
            if (event.changedTouches.length === 0) return;

            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;
            const duration = Date.now() - touchStartTime;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            // 3. Tap for rotation
            if (
                  absX < SWIPE_THRESHOLD && absY < 
                  SWIPE_THRESHOLD && duration < TAP_TIMEOUT
               ) 
            {
                if (handlers.onRotate) handlers.onRotate();
                return;
            }

            // 2. Vertical swipes for left and right movement
            if (absX > absY && absX > SWIPE_THRESHOLD) {
                if (deltaX > 0) {
                    if (handlers.onMoveRight) handlers.onMoveRight();
                } else {
                    if (handlers.onMoveLeft) handlers.onMoveLeft();
                }
                return;
            }

            // 4. Vertical swipes for soft and hard drops
            if (absY > absX && absY > SWIPE_THRESHOLD) {
                if (deltaY > 0) {
                    if (handlers.onSoftDrop) handlers.onSoftDrop();
                } else {
                    if (handlers.onHardDrop) handlers.onHardDrop();
                }
            }
        },
        { passive: false }
    );
}