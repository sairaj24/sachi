document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const sparkleOverlay = document.getElementById('sparkle-overlay'); // NEW: Sparkle container
    const photoFrame = document.querySelector('.photo-frame');
    const mainMessage = document.getElementById('the-main-message');
    
    // --- Sparkle Generator Function ---
    function launchSparkles() {
        const NUM_SPARKLES = 150; // A good number for a full-page burst
        for (let i = 0; i < NUM_SPARKLES; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random size for variety
            const size = Math.random() * 5 + 3; // 3px to 8px
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;

            // Random position across the entire screen
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;

            // Stagger animation delay slightly
            sparkle.style.animationDelay = `${Math.random() * 0.8}s`; 
            
            sparkleOverlay.appendChild(sparkle);
        }
        // Clean up sparkles after they fade out
        setTimeout(() => {
            sparkleOverlay.innerHTML = ''; // Clear all sparkles
        }, 2000); // Give them time to animate
    }

    // --- Confetti Generator Function (Unchanged) ---
    function launchConfetti() {
        const NUM_CONFETTI = 50;
        for (let i = 0; i < NUM_CONFETTI; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            piece.style.top = `${Math.random() * 20}%`;
            piece.style.left = `${40 + Math.random() * 20}%`;
            piece.style.setProperty('--x-offset', `${(Math.random() * 200 - 100)}px`); 
            
            sparkleOverlay.appendChild(piece); // Use sparkleOverlay as parent for confetti too
        }
        setTimeout(() => {
            // Only remove confetti pieces, not all sparkles, if you want different timing
            document.querySelectorAll('.confetti-piece').forEach(p => p.remove());
        }, 3000);
    }
    
    // --- SINGLE CLICK LOGIC ---
    button.addEventListener('click', () => {
        button.disabled = true;

        // 1. Play Music
        song.play().catch(error => console.error("Audio playback blocked:", error));

        // 2. Photo Entry Effect (Spin and Scale)
        photoFrame.style.transition = 'transform 1s ease-out';
        photoFrame.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            photoFrame.style.transform = 'scale(1) rotate(0deg)'; 
        }, 1000);

        // 3. Reveal Message
        messageArea.classList.add('revealed');
        mainMessage.style.display = 'block';
        
        // 4. LAUNCH THE FULL-PAGE SPARKLES!
        launchSparkles();
        
        // 5. Launch Confetti (can happen at the same time or slightly after sparkles)
        launchConfetti();

        // 6. Hide the button
        button.style.display = 'none'; 
    });
});
