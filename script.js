document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const button = document.getElementById('play-button');
    const animationOverlay = document.querySelector('.animation-overlay');

    // Create and append the heart elements to the animation overlay
    for (let i = 1; i <= 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        animationOverlay.appendChild(heart);
    }
    
    // Music and Animation Trigger on Click
    button.addEventListener('click', () => {
        // Attempt to play the music
        song.play().then(() => {
            // Success: Hide the button and start the animation
            button.style.display = 'none';
        }).catch(error => {
            // Failure (e.g., policy block): Log and proceed
            console.error("Audio playback blocked:", error);
            button.innerText = "Enjoy the card!"; // Change message if blocked
            setTimeout(() => {
                button.style.display = 'none';
            }, 3000);
        });
        
        // Start the animation immediately (it relies on the CSS)
        // Since the hearts are created, they start moving now
    });
});