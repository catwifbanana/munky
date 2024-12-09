// Create falling bananas with .gif for visuals
function createBananas() {
    const container = document.getElementById('bananas');
    if (!container) return; // Ensure container exists

    // Clear any existing bananas first
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const banana = document.createElement('div');
        const gif = document.createElement('img');
        gif.src = 'munky.gif';  // Path to your .gif
        gif.className = 'banana fixed absolute';  // Tailwind classes for positioning

        // Set random horizontal position and set the bottom position to 0 (start from bottom)
        banana.style.left = `${Math.random() * 100}%`;  // Random horizontal position
        banana.style.bottom = '0';  // Start from the bottom (0 position)
        
        // Random duration for each banana's animation
        banana.style.animationDuration = `${5 + Math.random() * 10}s`;  // Random duration for animation
        banana.style.animationDelay = `${Math.random() * 5}s`;  // Random delay before starting animation
        
        // Apply the moveUp animation (flying up from bottom to top)
        banana.style.animation = `moveUp ${5 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`;

        // Add the image element to the banana container
        banana.appendChild(gif);
        container.appendChild(banana);
    }
}

// Add global styles for flying up animation
function addFallingBananaStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes moveUp {
            from {
                transform: translateY(0) rotate(0deg);  /* Start at the bottom */
            }
            to {
                transform: translateY(-100vh) rotate(360deg);  /* Move up off the screen */
            }
        }

        .banana {
            z-index: -1;
            user-select: none;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addFallingBananaStyles();
    createBananas();
});

// Optional: Recreate bananas if window is resized
window.addEventListener('resize', createBananas);
