const background = document.getElementById('content') as HTMLElement
const buttonsWeather = document.querySelectorAll('.carousel-controls .control-button')

interface Weather {
	name: string
	path: string
	sound: string
}

const weather: Weather[] = [
	{ name: 'sunny', path: './images/summer-bg.jpg', sound: './sounds/summer.mp3' },
	{ name: 'rainy', path: './images/rainy-bg.jpg', sound: './sounds/rain.mp3' },
	{ name: 'snowy', path: './images/winter-bg.jpg', sound: './sounds/winter.mp3' }
]

let currentAudio: HTMLAudioElement | null = null

const changeBackground = (weatherType: string) => {

	const selectedWeather = weather.find(w => w.name === weatherType)

	if (selectedWeather) {
		background.style.backgroundImage = `url(${selectedWeather.path})`

		if (currentAudio) {
			currentAudio.pause()
			currentAudio.currentTime = 0
		}

		background.classList.remove('sunny', 'rainy', 'snowy')
		background.classList.add(selectedWeather.name)

		currentAudio = new Audio(selectedWeather.sound)
		currentAudio.play()

	} else {
		console.log(`Не найдено соответствие для погоды: ${weatherType}`)
	}

}

buttonsWeather.forEach((button) => {

	const weatherType = button.getAttribute('data-weather')

	if (weatherType) {
		button.addEventListener('click', () => {
			if (currentAudio && !currentAudio.paused && currentAudio.src.includes(weatherType)) {
				currentAudio.pause()
			} else {
				changeBackground(weatherType)
			}
		})
	} else {
		console.log('Атрибут data-weather не найден у кнопки.')
	}
})

