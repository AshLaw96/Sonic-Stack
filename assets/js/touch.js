/**
 * Attaches swipe and tap gesture listeners to the game area.
 */
export function initTouchControls(gameContainer, handlers) {
    if (!gameContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const SWIPE_THRESHOLD = 30;

    const TAP_TIMEOUT = 250;

    gameContainer.addEventListener(
        "touchstart",
        (e) => {
            // Prevent scrolling/zooming while playing
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                touchStartTime = Date.now();
            }
        },
        { passive: false }
    );

    gameContainer.addEventListener(
        "touchmove",
        (e) => {
            e.preventDefault();
        },
        { passive: false }
    );

    gameContainer.addEventListener(
        "touchend",
        (e) => {
            if (e.changedTouches.length === 0) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const duration = Date.now() - touchStartTime;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            if (
                  absX < SWIPE_THRESHOLD && absY < 
                  SWIPE_THRESHOLD && duration < TAP_TIMEOUT
               ) 
            {
                if (handlers.onRotate) handlers.onRotate();
                return;
            }

            // 2. Detect Horizontal Swipes
            if (absX > absY && absX > SWIPE_THRESHOLD) {
                if (deltaX > 0) {
                    if (handlers.onMoveRight) handlers.onMoveRight();
                } else {
                    if (handlers.onMoveLeft) handlers.onMoveLeft();
                }
                return;
            }

            // 3. Detect Vertical Swipes
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