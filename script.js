document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationArea = document.getElementById('animation-area');
    const messages = document.querySelectorAll('.sweet-message');
    let step = 0; // Tracks the current stage: 0=Start, 1=Music/Message 1, 2=Message 2, 3=Final

    // --- Balloon Generator (Fixed) ---
    const NUM_BALLOONS = 10;
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        // Add a unique index for CSS targeting
        balloon.style.setProperty('--nth-child', i + 1); 
        animationArea.appendChild(balloon);
    }
    // Note: The CSS handles the unique timing and positioning now.
    
    // --- Message and Music Logic ---
    button.addEventListener('click', () => {
        step++;

        if (step === 1) {
            // First Click: Start Music, Reveal first message, Start Animation
            
            // 1. Play Music
            song.play().catch(error => console.error("Audio playback blocked:", error));

            // 2. Reveal Message Area
            messageArea.classList.add('revealed');
            
            // 3. Show Message 1
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector('[data-step="1"]').style.display = 'block';

            // 4. Update Button
            button.innerText = "Next Memory...";

        } else if (step > 1 && step <= messages.length) {
            // Next Clicks: Cycle through messages (2 and 3)
            
            // 1. Hide current and show next message
            messages.forEach(msg => msg.style.display = 'none');
            document.querySelector(`[data-step="${step}"]`).style.display = 'block';

            // 2. Update Button
            if (step === messages.length) {
                button.innerText = "Enjoy the celebration! 🥳";
            } else {
                button.innerText = "One more message...";
            }

        } else if (step > messages.length) {
            // Final Click: Transition to final state
            button.style.display = 'none'; // Hide button after last message is read
            // Optionally, we could add a final confetti effect here!
        }
    });
});
