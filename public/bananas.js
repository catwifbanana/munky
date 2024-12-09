// Create falling bananas with .gif for visuals
function createBananas() {
    const container = document.getElementById('bananas');
    if (!container) return; // Ensure container exists
    
    // Only recreate bananas if they don't already exist
    if (container.children.length > 0) return;

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
    const existingStyle = document.getElementById('falling-bananas-style');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'falling-bananas-style';
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
            transform-style: preserve-3d;
            backface-visibility: hidden;
        }
        .banana-gif {
            width: 6rem;
            height: 6rem;
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
            transform: translateZ(0);
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
    `;
    document.head.appendChild(style);
}

// Debounce function to prevent excessive calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize bananas only once
function initBananas() {
    // Create a container for bananas if it doesn't exist
    if (!document.getElementById('bananas')) {
        const bananaContainer = document.createElement('div');
        bananaContainer.id = 'bananas';
        document.body.appendChild(bananaContainer);
    }
    addFallingBananaStyles();
    createBananas();
}

// Prevent multiple initializations
let bananaInitialized = false;

// Event listeners with added protection
document.addEventListener('DOMContentLoaded', () => {
    if (!bananaInitialized) {
        initBananas();
        bananaInitialized = true;
    }
});

// Debounced resize handler to prevent excessive redraws
const debouncedCreateBananas = debounce(() => {
    const container = document.getElementById('bananas');
    if (container) {
        container.innerHTML = ''; // Clear existing bananas
        createBananas();
    }
}, 250);

// Add resize listener
window.addEventListener('resize', debouncedCreateBananas);

// Prevent animation reset on mobile interactions
window.addEventListener('touchstart', (e) => {
    if (e.target.closest('#bananas')) {
        e.preventDefault();
    }
}, { passive: false });
