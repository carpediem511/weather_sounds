interface Weather {
	name: string
	image: string
	sound: HTMLAudioElement
}

const background = document.getElementById('content') as HTMLElement
const buttonsWeather = document.querySelectorAll('.carousel-controls .control-button')
const stopBtn = document.getElementById('play-pause-btn') as HTMLButtonElement
const range = document.getElementById('range') as HTMLInputElement
const volumeItems = document.querySelectorAll('.volume-item')

const audioSun = new Audio('./sounds/summer.mp3') as HTMLAudioElement
const audioRain = new Audio('./sounds/rain.mp3') as HTMLAudioElement
const audioSnow = new Audio('./sounds/winter.mp3') as HTMLAudioElement

const weather: Weather[] = [
	{ name: 'sunny', image: './images/summer-bg.jpg', sound: audioSun },
	{ name: 'rainy', image: './images/rainy-bg.jpg', sound: audioRain },
	{ name: 'snowy', image: './images/winter-bg.jpg', sound: audioSnow }
]

let currentAudio: HTMLAudioElement | null = null

const changeWeather = (weatherType: string) => {

	const selectedWeather = weather.find(w => w.name === weatherType)

	if (!selectedWeather) {
		console.log(`Не найдено соответствие для погоды: ${weatherType}`)
		return
	}

	setBgImage(selectedWeather.image)
	stopCurrentAudio()

	currentAudio = selectedWeather.sound

	const volume = parseFloat(range.value) / 100
	setVolume(currentAudio, volume)

	currentAudio.play()
}

const setBgImage = (image: string) => {
	background.style.backgroundImage = `url(${image})`
}

const stopCurrentAudio = () => {
	if (currentAudio) {
		currentAudio.pause()
		currentAudio.currentTime = 0
	}
}

const setVolume = (audio: HTMLAudioElement, volume: number) => {
	audio.volume = volume
}

const updateVolumeDisplay = (volume: number): void => {
	volumeItems.forEach((item) => {
		const volumeItem: number = parseInt(item.getAttribute('data-volume') || '0', 10)
		item.classList.toggle('active', volumeItem <= volume)
	})
}

const initializeWeatherButtons = () => {

	buttonsWeather.forEach((button) => {

		const weatherType = button.getAttribute('data-weather')

		if (weatherType) {
			button.addEventListener('click', () => {
				if (currentAudio && !currentAudio.paused && currentAudio.src.includes(weatherType)) {
					currentAudio.pause()
				} else {
					changeWeather(weatherType)
				}
			})
		} else {
			console.log('Атрибут data-weather не найден у кнопки')
		}
	})
}

const initializePlayPauseButton = () => {
	stopBtn.addEventListener('click', () => {
		if (currentAudio) {
			currentAudio.paused ? currentAudio.play() : currentAudio.pause()
		}
	})
}

const initializeVolumeControl = () => {
	range.addEventListener('input', () => {
		const volume = parseInt(range.value, 10)

		if (currentAudio) {
			setVolume(currentAudio, volume / 100)
		}
		updateVolumeDisplay(volume)
	})
}

const initializeApp = () => {
	initializeWeatherButtons()
	initializePlayPauseButton()
	initializeVolumeControl()
}

initializeApp()






