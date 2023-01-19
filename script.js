"use strict"

let weather = {
    apiKey: "cc8e58d0bfcd406a5f70a67dd5242b38",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { description, icon } = data.weather[0]
        console.log(name, temp, humidity, speed, description, icon);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temperature").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind-speed").innerText = "Wind speed: " + speed + "km/m";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".the-weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search-button").addEventListener("click", event =>
    weather.search(event)
)

document.querySelector(".search-bar").addEventListener("keyup", event => {
    if (event.key == "Enter") {
        weather.search();
    }
}
);

weather.fetchWeather("Vilnius")