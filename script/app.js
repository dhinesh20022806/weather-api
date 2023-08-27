const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  console.log(data);
  const { cityDet, weather } = data;

  details.innerHTML = ` 
    <h5 class="my-3">${cityDet.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    
    `;
  weather.IsDayTime
    ? time.setAttribute("src", `./images/day.svg`)
    : time.setAttribute("src", `./images/night.svg`);

    // change icon 
    // icon.setAttribute("src",`./icons/${weather.WeatherIcon}.svg`)
    const iconsrc = `./icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconsrc)

  // display
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDet = await getCity(city);
  const weather = await getWeather(cityDet.Key);

  return {
    cityDet,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.location.value.trim();
  // console.log(city);
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  cityForm.reset();
});
