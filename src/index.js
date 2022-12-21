import "./style.scss";

let weather = {
  apiKey: "505123a51d0132967c05ce45843aa05e",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=pl&appid=" +
        this.apiKey
    )
      //testing response from api
      .then((response) => {
        if (!response.ok) {
          document.querySelector(".main-content__weather").innerText =
            "Nie znaleziono takiego miasta";
          document.location.reload(true);
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  //Function for display weather
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".main-content__weather__city").innerText =
      "Pogoda w " + name;
    //Adding weather icon, from api
    document.querySelector(".main-content__weather_icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    //Adding text description
    document.querySelector(".main-content__weather__description").innerText =
      description;
    //Adding temp
    document.querySelector(".main-content__weather__temp").innerText =
      parseInt(temp) + "°C";
    //Adding humidity
    document.querySelector(".main-content__weather__humidity").innerText =
      "Wilgotność: " + humidity + "%";
    //Adding wind speed
    document.querySelector(".main-content__weather__wind").innerText =
      "Prędkość wiatru: " + speed + " kM/h";
    //loading class is for hide results while loading weather
    document
      .querySelector(".main-content__weather")
      .classList.remove("weather--loading");
    //removing input text after search event
    document.querySelector(".main-content__search__input").value = "";
    //function for showing background image
    function ShowImage(temp) {
      if (temp < 0) {
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1920x1080/?winter')";
      } else if (temp >= 0 && temp <= 15) {
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1920x1080/?autumn')";
      } else if (temp > 15) {
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1920x1080/?summer')";
      } else {
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')";
      }
    }
    //Showing Background Image
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + ShowImage(temp) + "')";
  },
  search: function () {
    this.fetchWeather(
      document.querySelector(".main-content__search__input").value
    );
  },
};
//Listener to search for weather
document
  .querySelector(".main-content__search__button")
  .addEventListener("click", function () {
    weather.search();
  });
// Listener to search using Enter key
document
  .querySelector(".main-content__search")
  .addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Ropczyce");
