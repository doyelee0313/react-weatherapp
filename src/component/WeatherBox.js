import React from 'react'

const WeatherBox = ({weather}) => { //props 안에 있는 weather 만 들고온다는 뜻
   console.log(weather);
   let F = 1.8 * weather?.main.temp + 32;
  return (  
    <div>
        {/* <div>{weather.name && weather}</div> //{weather.name} 하면 null값이라 못읽음 */}
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}도 / {F}화씨</h2>
        <h2>{weather?.weather[0].description}</h2>
    </div>
  )
}

export default WeatherBox