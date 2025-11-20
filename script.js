document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationContainer = document.getElementById('animation-container');
    const photoFrame = document.querySelector('.photo-frame');
    const mainMessage = document.getElementById('the-main-message');
    
    // --- Balloon Generator Function (For continuous background) ---
    function launchBalloons() {
        const NUM_BALLOONS = 12; 
        for (let i = 0; i < NUM_BALLOONS; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random styling for scattered look
            balloon.style.left = `${Math.random() * 95}%`; 
            balloon.style.animationDelay = `${Math.random() * 10}s`; // Stagger start time
            balloon.style.animationDuration = `${18 + Math.random() * 10}s`;
            
            animationContainer.appendChild(balloon);
        }
    }

    // --- Sparkle Generator Function (For transient burst) ---
    function launchSparkles() {
        const NUM_SPARKLES = 150; 
        for (let i = 0; i < NUM_SPARKLES; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const size = Math.random() * 5 + 3; 
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;

            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;

            sparkle.style.animationDelay = `${Math.random() * 0.8}s`; 
            
            animationContainer.appendChild(sparkle);
        }
        setTimeout(() => {
            document.querySelectorAll('.sparkle').forEach(p => p.remove());
        }, 2000); 
    }

    // --- Confetti Generator Function (For transient burst) ---
    function launchConfetti() {
        const NUM_CONFETTI = 50;
        for (let i = 0; i < NUM_CONFETTI; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            piece.style.top = `${Math.random() * 20}%`;
            piece.style.left = `${40 + Math.random() * 20}%`;
            piece.style.setProperty('--x-offset', `${(Math.random() * 200 - 100)}px`); 
            
            animationContainer.appendChild(piece);
        }
        setTimeout(() => {
            document.querySelectorAll('.confetti-piece').forEach(p => p.remove());
        }, 3000);
    }
    
    // --- SINGLE CLICK LOGIC (Executes all animations) ---
    button.addEventListener('click', () => {
        button.disabled = true;

        // 1. Play Music
        song.play().catch(error => console.error("Audio playback blocked:", error));

        // 2. Photo Entry Effect
        photoFrame.style.transition = 'transform 1s ease-out';
        photoFrame.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            photoFrame.style.transform = 'scale(1) rotate(0deg)'; 
        }, 1000);

        // 3. LAUNCH ALL ANIMATIONS
        // The burst effects first (Sparkles and Confetti)
        launchSparkles();
        launchConfetti();
        
        // The continuous background effect next
        launchBalloons(); 

        // 4. Reveal Message
        messageArea.classList.add('revealed');
        mainMessage.style.display = 'block';
        
        // 5. Hide the button
        button.style.display = 'none'; 
    });
});
