let apiKey = "743bee57fddbfaf52447193a87d5dd25";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
function formatDate(timestamp) {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hours}`;
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
function displayWeather(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind:${response.data.wind.speed}km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
