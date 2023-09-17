"use strict";
class Forecast{
  constructor(){
    this.key = `STy5tcNeLJNA3KURFbRKOrzpTDr7gbki`;
    this.weatherURL = "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURL = "https://dataservice.accuweather.com/locations/v1/cities/search"
  }
  async updateCity(city){
    const cityDet = await this.getCity(city);
    const weather = await this.getWeather(cityDet.Key);

  return {
    cityDet,
    weather,
  };

  }
  async getCity(city){
  const query = `?apikey=${this.key}&q=${city}`;
  const response = await fetch(this.cityURL + query);
  const data = await response.json();
  return data[0];

  }
  async getWeather(id){
    const query = `${id}?apikey=${this.key}`;
  const response = await fetch(this.weatherURL + query);
  const data = await response.json();
  return data[0];

  }

}






// getCity("needamangalam")
// .then((data) => {
//     // console.log(data);
//       return getWeather(data.Key)
//   }).then(data => console.log(data))
//   .catch((err) => console.log(err));

