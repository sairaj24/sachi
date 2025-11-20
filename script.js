document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('reveal-button');
    const messageArea = document.getElementById('message-area');
    const animationArea = document.getElementById('animation-area');
    const photoFrame = document.querySelector('.photo-frame');
    const mainMessage = document.getElementById('the-main-message');
    
    // --- Balloon and Star Generator ---
    const NUM_BALLOONS = 12; // Fewer, bigger balloons
    const NUM_STARS = 30; // Many small, falling stars

    // Generate Balloons (float up)
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 95}%`; 
        balloon.style.animationDelay = `${Math.random() * 8}s`;
        balloon.style.animationDuration = `${18 + Math.random() * 10}s`;
        animationArea.appendChild(balloon);
    }

    // Generate Stars (fall down)
    for (let i = 0; i < NUM_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 95}%`; 
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${6 + Math.random() * 4}s`; // Faster fall
        animationArea.appendChild(star);
    }

    // --- Confetti Generator Function ---
    function launchConfetti() {
        const NUM_CONFETTI = 50;
        for (let i = 0; i < NUM_CONFETTI; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            piece.style.top = `${Math.random() * 20}%`;
            piece.style.left = `${40 + Math.random() * 20}%`;
            piece.style.setProperty('--x-offset', `${(Math.random() * 200 - 100)}px`); 
            
            animationArea.appendChild(piece);
        }
        setTimeout(() => {
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

        // 3. Reveal Message and Launch Confetti
        messageArea.classList.add('revealed');
        mainMessage.style.display = 'block';
        launchConfetti();
        
        // 4. Hide the button
        button.style.display = 'none'; 
    });
});
