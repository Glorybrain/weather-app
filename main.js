const inputBox = document.querySelector(".input-box")
const searchBtn = document.getElementById("search-btn")
let weatherImg = document.querySelector(".weather-img")
let temperature = document.querySelector(".temperature")
let description = document.querySelector(".description")
let humidity = document.getElementById("humidity")
let windSpeed = document.getElementById("wind-speed")
let locationInvalid = document.querySelector(".location-invalid")
let weatherContainer = document.querySelector(".weather-container")

async function checkWeather(city) {
    const api_key = "1fc2fcee0b8533c31e3a599b684ae437"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const weatherData = await fetch(`${url}`).then(response => response.json())
    
    if(weatherData.cod === "404") {
        locationInvalid.style.display = "flex"
        weatherContainer.style.display = "none"
        return
    }

    locationInvalid.style.display = "none"
    weatherContainer.style.display = "flex"
    
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`
    description.innerHTML = `${weatherData.weather[0].description}`
    humidity.innerHTML = `${weatherData.main.humidity}%`
    windSpeed.innerHTML = `${weatherData.wind.speed}km/h`

    switch(weatherData.weather[0].main) {
        case "Clouds": weatherImg.src = "images/cloud.png"
        break;
        case "Rain": weatherImg.src = "images/rain.png"
        break;
        case "Mist": weatherImg.src = "images/mist.png"
        break;
        case "Snow": weatherImg.src = "images/snow.png"
        break;
        case "Clear": weatherImg.src = "images/clear.png"
        break;
    }
}

searchBtn.addEventListener("click", function() {
    checkWeather(inputBox.value)
})