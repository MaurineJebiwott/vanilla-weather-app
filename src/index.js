function formatDate(timestamp) {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  return `${day} ${hour}:${minute} `;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  forecastDays.forEach(function (day) {
    forecastHTML += `<div class="col-2">
                <div>${day}</div>
                <div>
                  <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    alt="clear"
                    class="forecast-icons"
                    width="36"
                  />
                </div>
                <div> <span>20</span>
                  <span>12</span></div>
              </div>`;
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayWeather(response) {
  let temperature = document.querySelector(".temperature");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = ` Humidity:${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind:${response.data.wind.speed}km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
}
function weatherApi(city) {
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector(".search-input");
  weatherApi(cityElement.value);
}
function changeTemperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function changeTemperatureCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTemperatureFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", changeTemperatureCelsius);

weatherApi("Nairobi");
displayForecast();
