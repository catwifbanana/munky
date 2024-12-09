// Create falling bananas with .gif for visuals
function createBananas() {
    const container = document.getElementById('bananas');
    if (!container) return; // Ensure container exists

    // Clear any existing bananas first
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const banana = document.createElement('div');
        banana.className = 'banana';

        const gif = document.createElement('img');
        gif.src = 'munky.gif';  // Path to your .gif
        gif.className = 'banana-gif';

        // Set random horizontal position across the entire width of the viewport
        banana.style.left = `${Math.random() * 100}%`;
        
        // Random rotation and slight horizontal movement for variety
        const horizontalMovement = (Math.random() - 0.5) * 200; // Random lateral movement
        const rotation = (Math.random() - 0.5) * 720; // Random rotation

        // Random duration and delay for more natural falling effect
        const animationDuration = 5 + Math.random() * 10;
        const animationDelay = Math.random() * 5;

        // Add the image element to the banana container
        banana.appendChild(gif);
        container.appendChild(banana);

        // Add unique animation for each banana
        banana.style.setProperty('--drift', `${horizontalMovement}px`);
        banana.style.setProperty('--rotate', `${rotation}deg`);
        banana.style.setProperty('--duration', `${animationDuration}s`);
        banana.style.setProperty('--delay', `${animationDelay}s`);
    }
}

// Add global styles for falling animation
function addFallingBananaStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #bananas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            overflow: hidden;
            z-index: -1;
        }

        .banana {
            position: fixed;
            bottom: -100px;
            user-select: none;
            pointer-events: none;
            animation: moveDown var(--duration) linear var(--delay) infinite;
            will-change: transform;
        }

        .banana-gif {
            width: 6rem;
            height: 6rem;
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
        }

        @keyframes moveDown {
            from {
                transform: 
                    translateX(var(--drift)) 
                    translateY(0) 
                    rotate(0deg);
            }
            to {
                transform: 
                    translateX(var(--drift)) 
                    translateY(calc(100vh + 200px)) 
                    rotate(var(--rotate));
            }
        }

        /* Firefox-specific optimizations */
        @-moz-document url-prefix() {
            .banana {
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }
            
            .banana-gif {
                transform: translateZ(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create a container for bananas if it doesn't exist
    if (!document.getElementById('bananas')) {
        const bananaContainer = document.createElement('div');
        bananaContainer.id = 'bananas';
        document.body.appendChild(bananaContainer);
    }

    addFallingBananaStyles();
    createBananas();
});

// Optional: Recreate bananas if window is resized
window.addEventListener('resize', createBananas);
