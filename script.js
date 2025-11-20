document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationArea = document.getElementById('animation-area');
    const messages = document.querySelectorAll('.sweet-message');
    let step = 0;

    // --- Balloon Generator (Increased Count and Frequency) ---
    const NUM_BALLOONS = 20; // Increased to 20 balloons
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Apply random styling for scattered look
        balloon.style.left = `${Math.random() * 95}%`; 
        balloon.style.animationDelay = `${Math.random() * 5}s`; // Reduced delay range for higher frequency
        balloon.style.animationDuration = `${10 + Math.random() * 10}s`; // Speed: 10s to 20s
        
        animationArea.appendChild(balloon);
    }
    
    // --- Message and Music Logic (Simplified for 2 steps) ---
    const maxSteps = 2; // Only two steps/messages
    
    button.addEventListener('click', () => {
        step++;

        if (step === 1) {
            // First Click: Start Music, Reveal Message 1
            song.play().catch(error => console.error("Audio playback blocked:", error));
            messageArea.classList.add('revealed');
            
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector('[data-step="1"]').style.display = 'block';

            button.innerText = "Read my full message...";

        } else if (step === maxSteps) {
            // Second Click: Reveal Message 2 (Final Message)
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector(`[data-step="${maxSteps}"]`).style.display = 'block';

            button.innerText = "Enjoy the celebration! 🥳";

        } else if (step > maxSteps) {
            // Final State
            button.style.display = 'none';
        }
    });
});
