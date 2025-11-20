document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationArea = document.getElementById('animation-area');
    const messages = document.querySelectorAll('.sweet-message');
    let step = 0;

    // --- Balloon Generator (Fixed & Randomized) ---
    const NUM_BALLOONS = 12; // Increased count for better visual effect
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Apply random starting position (left) and animation timing (delay/duration)
        balloon.style.left = `${Math.random() * 90}%`; // Random horizontal position
        balloon.style.animationDelay = `${Math.random() * 10}s`; // Stagger the start time
        balloon.style.animationDuration = `${12 + Math.random() * 8}s`; // Random speed (12s to 20s)
        
        animationArea.appendChild(balloon);
    }
    
    // --- Message and Music Logic ---
    button.addEventListener('click', () => {
        step++;

        if (step === 1) {
            // First Click: Start Music, Reveal first message
            song.play().catch(error => console.error("Audio playback blocked:", error));
            messageArea.classList.add('revealed');
            
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector('[data-step="1"]').style.display = 'block';

            button.innerText = "Next Memory...";

        } else if (step > 1 && step <= messages.length) {
            // Next Clicks: Cycle through messages
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector(`[data-step="${step}"]`).style.display = 'block';

            if (step === messages.length) {
                button.innerText = "Enjoy the celebration! 🥳";
            } else {
                button.innerText = "One more message...";
            }

        } else if (step > messages.length) {
            // Final State
            button.style.display = 'none';
        }
    });
});
