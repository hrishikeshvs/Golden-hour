// Function to play the selected binaural beat
function playBinauralBeat(beatId) {
    // Stop any currently playing beat
    stopBinauralBeat();

    // Create an audio element
    const audio = new Audio();

    // Set the source of the audio element based on the selected beat
    switch (beatId) {
        case 'beat1':
            audio.src = 'https://drive.google.com/uc?id=1K4Xeok2EIIPCRkR_Aaco11BMjT0e_Iya'; // Replace with your direct URL
            break;
        // Add more cases for additional beats
    }

    // Play the audio
    audio.play();

    // Store the audio element in a global variable to stop it later if needed
    window.currentBinauralBeat = audio;
}


// Timer functionality
let timerInterval;
let timerRunning = false;
let timeInSeconds = 0;
let customTimeLimit = 0;

// Function to start the timer with a preset time limit
function startTimerWithPresetLimit(timeLimit) {
    customTimeLimit = timeLimit * 60;
    startTimer();
}

// Function to start the timer with a custom time limit
function startTimerWithCustomLimit() {
    const inputTimeInMinutes = parseInt(document.getElementById('timer-input').value, 10);
    if (inputTimeInMinutes && inputTimeInMinutes > 0) {
        customTimeLimit = inputTimeInMinutes * 60;
        startTimer();
    } else {
        alert('Please enter a valid time in minutes.');
    }
}

// Modify the startTimer function to use custom time limit
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    timeInSeconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    if (timeInSeconds < customTimeLimit) {
        timeInSeconds++;
        updateTimerDisplay();
    } else {
        stopTimer();
        playTimerFinishedSound(); // Play sound when the timer finishes
        alert('Timer finished!');
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor((customTimeLimit - timeInSeconds) / 60);
    const seconds = (customTimeLimit - timeInSeconds) % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = formattedTime;
}

// Event listeners for preset time buttons
document.querySelectorAll('.preset-time-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const timeLimit = parseInt(this.dataset.time, 10);
        startTimerWithPresetLimit(timeLimit);
    });
});

// Random quote functionality
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the midst of movement and chaos, keep stillness inside of you. - Deepak Chopra",
    "Your calm mind is the ultimate weapon against your challenges. So relax. - Bryant McGill",
    // Add more quotes as needed
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayRandomQuote() {
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
        quoteElement.textContent = getRandomQuote();
    }
}

// Event listeners for timer buttons

document.getElementById('start-timer-btn').addEventListener('click', startTimerWithCustomLimit);
document.getElementById('reset-timer-btn').addEventListener('click', resetTimer);

// Display random quote when the page loads
window.addEventListener('DOMContentLoaded', displayRandomQuote);

// Array of image URLs
const imageUrls = [
    "https://cdn11.bigcommerce.com/s-c2jb8p2u1p/product_images/uploaded_images/binaural-beats-banner.png",
    "https://i.swncdn.com/media/800w/via/18788-gettyimages-1205252186.jpg",
    "https://storage.googleapis.com/mv-prod-blog-en-assets/2024/01/c405cc12-how-to-use-binaural-beats-mindvalley-blog-01-midjourney-seo-team.webp",
    "https://jooinn.com/images/peaceful-8.jpg",
    "https://th.bing.com/th/id/OIP.DuQvziZ8oYM3uBCp0shwywHaEo?rs=1&pid=ImgDetMain",
    "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg",
    "https://th.bing.com/th/id/OIP.BT0aDei7v6j5PsrdVQX_TwHaE8?rs=1&pid=ImgDetMain"
    
];

// Function to select a random image URL
function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

// Function to display a random image
function displayRandomImage() {
    const imageUrl = getRandomImageUrl();
    const imageContainer = document.getElementById('random-image');
    if (imageContainer) {
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Random Image">`;
    }
}

// Call the function to display a random image when the page loads
window.addEventListener('DOMContentLoaded', displayRandomImage);

// Function to apply the selected theme
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme + '-theme');
}
// Function to play a sound when the timer finishes
function playTimerFinishedSound() {
    const timerFinishedSound = new Audio('clock_stop.mp3'); // Replace 'timer-finished-sound.mp3' with the URL or path to your audio file
    timerFinishedSound.play();
}

// Modify the update


// Event listener for theme selection
document.querySelectorAll('input[name="theme"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (this.checked) {
            applyTheme(this.value);
        }
    });
});
