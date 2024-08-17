import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

//1. 앱을 실행하자마자 현재 위치 기반 정보 표시: (도시, 날씨온도, 날씨상태)
//2. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 위치)
//3. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
//4. 현재위치 버튼을 누르면 다시 현대 위치 기반으로 돌아온다
//5. 데이터를 들고 오는 동안 로딩 스피너가 돈다
function App() {
  const [weather, setWeather] = useState(null)
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)});
  }, []);
  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a63949cb666d1a4a79a69224e0327f7b&units=metric`
    let response = await fetch(url); //비동기여야지만 await 쓸 수 있음
    let data = await response.json();
    setWeather(data);
  };
  useEffect(()=>{
    getCurrentLocation()
  }, [getCurrentLocation])
  return (
    <div className="container">
      <WeatherBox className="weather-box" weather={weather}/>
      <WeatherButton />
    </div>
  );
}

export default App;
