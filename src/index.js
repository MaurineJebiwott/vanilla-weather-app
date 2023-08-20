let apiKey = "743bee57fddbfaf52447193a87d5dd25";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
function displayWeather(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind:${response.data.wind.speed}km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather.description;
}
