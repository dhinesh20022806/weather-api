const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();
console.log(forecast);

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



cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.location.value.trim();
  // console.log(city);
  forecast.updateCity(city)
    .then((data) => {
      updateUI(data)
    document.querySelector("label").innerText = 'Enter a location for Weather Information';
    })
    .catch((err) => {
      document.querySelector("label").innerText = 'make sure the spell or give me a right place';
      console.log(err);
    });
    
    cityForm.reset();
    
    localStorage.setItem('city', city)
  });
  
  if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then((data) =>{
       updateUI(data)
    document.querySelector("label").innerText = 'Enter a location for Weather Information';
  })
    .catch((err) => console.log(err));
}


