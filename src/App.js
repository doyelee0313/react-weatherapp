import './App.css';
import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱을 실행하자마자 현재 위치 기반 정보 표시: (도시, 날씨온도, 날씨상태)
//2. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 위치)
//3. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
//4. 현재위치 버튼을 누르면 다시 현대 위치 기반으로 돌아온다
//5. 데이터를 들고 오는 동안 로딩 스피너가 돈다
function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("");
  const cities = [`paris`, `new york`, `tokyo`, `seoul`];
  const [loading, setLoading] = useState(true); //데이터를 fetch할때만 loading 하는거
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)});
  }, []);

  const getWeatherByCurrentLocation = async(lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a63949cb666d1a4a79a69224e0327f7b&units=metric`
      setLoading(true);
      let response = await fetch(url); //비동기여야지만 await 쓸 수 있음
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async() => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a63949cb666d1a4a79a69224e0327f7b&units=metric`;
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err){
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    console.log(city)
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  // useEffect(()=>{
  //   getCurrentLocation()
  // }, [getCurrentLocation])
  // //앱 실행할때 이거만 실행되고 다른거(초기값이 0인거는) 실행되면 안됨

  // useEffect(() => {
  //   getWeatherByCity();
  // }, [city]) //city 를 주시하고 있다가 바뀌면 함수 실행
  // //처음에 그려질 때도 실행됨, city 가 초기값이 빈값이기 때문에 가져올 수 없음

  useEffect(() => {
    if(city == ""){
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  //초기 값일때, 아닐때 돌아가는 거 각각 나누기

  return (
    <div className="container">
      {loading ? (<ClipLoader //loading 할때는 스피너, 아니면 내용 보여주기, 박스 위치 조정되는거 방지
        color="lime"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ) : !apiError ? (
        <div className="container">
          <WeatherBox className="weather-box" weather={weather}/>
          <WeatherButton cities={cities} handleCityChange={handleCityChange} setCity={setCity} selectedCity={city}/> 
          {/* 함수도 넘길 수 있음 */}
        </div> 
      ) : (
        apiError
      )}
    </div>
  )
}

export default App;
