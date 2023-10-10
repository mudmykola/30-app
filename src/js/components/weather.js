const apiKey = "3ede0554953b4fbb790104651a6b07c0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".weather-search input");
const searchBtn = document.querySelector(".weather-search button");
const weatherIcon = document.querySelector(".weather-img__icon");
const weatherCity = document.querySelector(".weather-city");
const weatherTemp = document.querySelector(".weather-temp");
const weatherHumidity = document.querySelector(".weather-hum__num");
const weatherWind = document.querySelector(".weather-wind__num");
const weatherInner = document.querySelector(".weather-inner");
const weatherError = document.querySelector(".weather-error");

async function updateWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        weatherCity.textContent = data.name;
        weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
        weatherHumidity.textContent = `${data.main.humidity}%`;
        weatherWind.textContent = `${data.wind.speed} km/h`;

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "img/icon-clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "img/icon-rain.png";
                break;
            case "Clear":
                weatherIcon.src = "img/icon-clear.png";
                break;
            case "Drizzle":
                weatherIcon.src = "img/icon-drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "img/icon-mist.png";
                break;
            default:
                weatherIcon.src = "";
        }

        weatherInner.style.display = "block";
        weatherError.style.display = "none";
    } catch (error) {
        weatherInner.style.display = "none";
        weatherError.textContent = "Error while receiving weather data";
        weatherError.style.display = "block";
    }
}

searchBox.addEventListener("keyup", (event) => {

    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city === "") {
            weatherError.textContent = "Enter the city";
            weatherError.style.display = "block";
            weatherInner.style.display = "none";
        } else {
            updateWeather(city);
        }
    }
});

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city === "") {
        weatherError.textContent = "Enter the city";
        weatherError.style.display = "block";
        weatherInner.style.display = "none";
    } else {
        updateWeather(city);
    }
});


window.addEventListener("load", () => {
    searchBox.value = "";
    updateWeather("");
});
