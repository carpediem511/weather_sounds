"use strict";
const background = document.getElementById('content');
const buttonsWeather = document.querySelectorAll('.carousel-controls .control-button');
const stopBtn = document.getElementById('play-pause-btn');
const range = document.getElementById('range');
const volumeItems = document.querySelectorAll('.volume-item');
const audioSun = new Audio('./sounds/summer.mp3');
const audioRain = new Audio('./sounds/rain.mp3');
const audioSnow = new Audio('./sounds/winter.mp3');
const weather = [
    { name: 'sunny', image: './images/summer-bg.jpg', sound: audioSun },
    { name: 'rainy', image: './images/rainy-bg.jpg', sound: audioRain },
    { name: 'snowy', image: './images/winter-bg.jpg', sound: audioSnow }
];
let currentAudio = null;
const changeWeather = (weatherType) => {
    const selectedWeather = weather.find(w => w.name === weatherType);
    if (!selectedWeather) {
        console.log(`Не найдено соответствие для погоды: ${weatherType}`);
        return;
    }
    setBgImage(selectedWeather.image);
    stopCurrentAudio();
    currentAudio = selectedWeather.sound;
    const volume = parseFloat(range.value) / 100;
    setVolume(currentAudio, volume);
    currentAudio.play();
};
const setBgImage = (image) => {
    background.style.backgroundImage = `url(${image})`;
};
const stopCurrentAudio = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
};
const setVolume = (audio, volume) => {
    audio.volume = volume;
};
const updateVolumeDisplay = (volume) => {
    volumeItems.forEach((item) => {
        const volumeItem = parseInt(item.getAttribute('data-volume') || '0', 10);
        item.classList.toggle('active', volumeItem <= volume);
    });
};
const initializeWeatherButtons = () => {
    buttonsWeather.forEach((button) => {
        const weatherType = button.getAttribute('data-weather');
        if (weatherType) {
            button.addEventListener('click', () => {
                if (currentAudio && !currentAudio.paused && currentAudio.src.includes(weatherType)) {
                    currentAudio.pause();
                }
                else {
                    changeWeather(weatherType);
                }
            });
        }
        else {
            console.log('Атрибут data-weather не найден у кнопки');
        }
    });
};
const initializePlayPauseButton = () => {
    stopBtn.addEventListener('click', () => {
        if (currentAudio) {
            currentAudio.paused ? currentAudio.play() : currentAudio.pause();
        }
    });
};
const initializeVolumeControl = () => {
    range.addEventListener('input', () => {
        const volume = parseInt(range.value, 10);
        if (currentAudio) {
            setVolume(currentAudio, volume / 100);
        }
        updateVolumeDisplay(volume);
    });
};
const initializeApp = () => {
    initializeWeatherButtons();
    initializePlayPauseButton();
    initializeVolumeControl();
};
initializeApp();
