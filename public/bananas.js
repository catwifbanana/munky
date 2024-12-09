// Create falling bananas for visuals
function createBananas() {
    const container = document.getElementById('bananas');
    if (!container) return; // Ensure container exists

    // Clear any existing bananas first
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const banana = document.createElement('div');
        banana.textContent = '🐒';
        banana.className = 'banana fixed absolute text-2xl opacity-70'; // Tailwind classes for positioning
        banana.style.left = `${Math.random() * 100}%`;
        banana.style.animationDuration = `${5 + Math.random() * 10}s`;
        banana.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add custom keyframe animation for falling
        banana.style.position = 'fixed';
        banana.style.top = '-20px';
        banana.style.animation = `fall ${5 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`;
        
        container.appendChild(banana);
    }
}

// Add global styles for falling animation
function addFallingBananaStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
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