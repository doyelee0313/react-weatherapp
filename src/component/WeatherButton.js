import React from 'react'
import { Button } from 'react-bootstrap';
//아무 state 도 가지고 있지 않음, 필요한 애들은 app.js 가 다 들고 있음
const WeatherButton = ({cities , setCity, handleCityChange, selectedCity}) => {//props 안쓰고 cities 바로 받기
  console.log({cities}) //배열로 하는 이유? button 일일이 추가하기 힘들어서, 많이 쓰이는 정보는 따로 관리하는게 좋음
  return (
    <div className="button-box">
      <Button variant={`${selectedCity == "" ? "light" : "outline-light"}`} onClick={()=>handleCityChange("current")}>Current Location</Button>
      {cities.map((city, index) => (
        <Button variant={`${selectedCity == city ? "light" : "outline-light"}`} onClick={()=>setCity(city)}>{city}</Button>
      ))}
    </div>
  )
}

export default WeatherButton