import React from 'react'

const WeatherBox = ({weather}) => { //props 안에 있는 weather 만 들고온다는 뜻
   console.log(weather);
   let F = Math.floor(1.8 * weather?.main.temp + 32);
  return (  
    <div class="container">
    <div class="box">
      {/* <div>{weather.name && weather}</div> //{weather.name} 하면 null값이라 못읽음 */}
      <span class="title">{weather?.name}</span>
      <div>
        <strong>{weather?.weather[0].description}</strong>
        <span>{weather?.main.temp}°C</span> <span>{F}°F</span>
      </div>
    </div>
  </div>
  )
}

export default WeatherBox