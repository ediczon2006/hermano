// Selecciona elementos
const intro = document.getElementById('intro');
const card = document.getElementById('birthdayCard');
const startButton = document.getElementById('startButton');
const audio = document.getElementById('birthdaySong');
const lyricsContainer = card.querySelector('.lyrics');
const confettiContainer = card.querySelector('.confetti-container');

// Letras sincronizadas con la canción "Happy Birthday" (tiempos aproximados en segundos; ajusta según tu MP3)
const lyrics = [
    { time: 0, text: '¡Feliz cumpleaños a ti!' },
    { time: 5, text: '¡Feliz cumpleaños a ti!' },
    { time: 10, text: '¡Feliz cumpleaños, querido hermano!' },
    { time: 15, text: '¡Feliz cumpleaños a ti!' },
    // Añade más si tu canción es más larga o tiene variaciones
];

let currentLine = -1;
const currentLineInterval = 2; // Intervalo para fade in/out (ajusta para sincronización)

// Evento para iniciar la fiesta
startButton.addEventListener('click', () => {
    intro.style.display = 'none';
    card.classList.remove('hidden');
    audio.play().catch(error => console.log('Autoplay bloqueado; inicia manualmente:', error));

    // Iniciar sincronización de letras
    audio.addEventListener('timeupdate', updateLyrics);
});

// Función para actualizar letras
function updateLyrics() {
    for (let i = 0; i < lyrics.length; i++) {
        const diff = Math.abs(audio.currentTime - lyrics[i].time);
        if (diff < currentLineInterval) {
            if (i !== currentLine) {
                currentLine = i;
                lyricsContainer.textContent = lyrics[i].text;
            }
            lyricsContainer.style.opacity = 1 - (diff / currentLineInterval);
            return;
        }
    }
    // Reset si no hay línea actual
    if (currentLine !== -1) {
        lyricsContainer.style.opacity = 0;
        currentLine = -1;
    }
}

// Función para crear sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const x = Math.random() * card.offsetWidth;
    const y = Math.random() * card.offsetHeight;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    const size = Math.random() * 15 + 5;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    const colors = ['#ffd700', '#ff69b4', '#00ff00', '#4169e1', '#ff4500', '#ffffff'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 0.7 + 0.8;
    sparkle.style.animationDuration = `${duration}s`;
    card.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), duration * 1000);
}

setInterval(createSparkle, 100);
for (let i = 0; i < 50; i++) {
    setTimeout(createSparkle, i * 30);
}

// Función para crear confeti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.width = `${Math.random() * 5 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 10}px`;
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
}

setInterval(createConfetti, 200);
for (let i = 0; i < 100; i++) {
    setTimeout(createConfetti, i * 50);
}

// Ocultar título después de un tiempo (ajusta el timeout según la duración de la canción)
setTimeout(() => {
    card.querySelector('.title').style.opacity = 0;
}, 200000000); // Ejemplo: 20 segundos