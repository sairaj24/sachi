document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationArea = document.getElementById('animation-area');
    const photoFrame = document.querySelector('.photo-frame');
    const messages = document.querySelectorAll('.sweet-message');
    let step = 0;
    const maxSteps = 2; 

    // --- Balloon Generator (Unchanged from last successful version) ---
    const NUM_BALLOONS = 20;
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        balloon.style.left = `${Math.random() * 95}%`; 
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        animationArea.appendChild(balloon);
    }
    
    // --- Confetti Generator Function ---
    function launchConfetti() {
        const NUM_CONFETTI = 50;
        for (let i = 0; i < NUM_CONFETTI; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            // Random start position near the top center
            piece.style.top = `${Math.random() * 20}%`;
            piece.style.left = `${40 + Math.random() * 20}%`;

            // Random horizontal offset for the fall (spread)
            piece.style.setProperty('--x-offset', `${(Math.random() * 200 - 100)}px`); 
            
            animationArea.appendChild(piece);
        }
        // Remove confetti after animation (clean up)
        setTimeout(() => {
            document.querySelectorAll('.confetti-piece').forEach(p => p.remove());
        }, 3000);
    }
    
    // --- Message and Music Logic ---
    button.addEventListener('click', () => {
        step++;

        if (step === 1) {
            // STEP 1: START CELEBRATION
            song.play().catch(error => console.error("Audio playback blocked:", error));
            messageArea.classList.add('revealed');
            
            // Photo Entry Effect (Spin and Scale)
            photoFrame.style.transition = 'transform 1s ease-out';
            photoFrame.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                photoFrame.style.transform = 'scale(1) rotate(0deg)'; // Settle back down
            }, 1000);
            
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector('[data-step="1"]').style.display = 'block';

            button.innerText = "Read my full message...";

        } else if (step === maxSteps) {
            // STEP 2: FINAL MESSAGE & WOW EFFECT
            
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector(`[data-step="${maxSteps}"]`).style.display = 'block';
            
            // Launch the Confetti Effect!
            launchConfetti();
            
            button.innerText = "Enjoy the celebration! 🥳";

        } else if (step > maxSteps) {
            // Final State
            button.style.display = 'none';
        }
    });
});
