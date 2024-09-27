var background = document.getElementById('content');
var buttonsWeather = document.querySelectorAll('.carousel-controls .control-button');
var weather = [
    { name: 'sunny', path: './images/summer-bg.jpg' },
    { name: 'rainy', path: './images/rainy-bg.jpg' },
    { name: 'snowy', path: './images/winter-bg.jpg' }
];
var changeBackground = function (weatherType) {
    var selectedWeather = weather.find(function (w) { return w.name === weatherType; });
    if (selectedWeather) {
        background.style.backgroundImage = "url(".concat(selectedWeather.path, ")");
    }
    else {
        console.log("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0433\u043E\u0434\u044B: ".concat(weatherType));
    }
};
buttonsWeather.forEach(function (button) {
    var weatherType = button.getAttribute('data-weather');
    if (weatherType) {
        button.addEventListener('click', function () { return changeBackground(weatherType); });
    }
    else {
        console.log('Атрибут data-weather не найден у кнопки.');
    }
});
