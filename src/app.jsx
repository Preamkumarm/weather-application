import "./app.css";
import { useState } from "react";
import axios from "axios";

import Search from "./img/search.png";
import temp from "./img/temp.png";
import locate from "./img/location.png";
import wind from "./img/wind.png";

import Drizzle from "./img/drizzle.png";
import Rain from "./img/rain.png";
import Clear from "./img/clear.png";
import Snow from "./img/snow.png";
import Thunderstrom from "./img/thunderstrom.png";
import Clouds from "./img/cloud.png";

function App() {
  const [Icon, setIcon] = useState(Clear);
  const [Temp, setTemp] = useState(0);
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Weather, setWeather] = useState("");
  const [Wind, setWind] = useState(0);

  function HandleCity(e) {
    setCity(e.target.value);
  }

  const weatherIconMap = {
    "01d": Clear,
    "01n": Clear,
    "02d": Clouds,
    "02n": Clouds,
    "03d": Drizzle,
    "03n": Drizzle,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "11d": Thunderstrom,
    "11n": Thunderstrom,
    "13d": Snow,
    "13n": Snow,
    "50d": Snow,
    "50d": Snow,
  };
  function find() {
    const App_id = "6be94f68890728a5fd01a5fd8b44ee35";
    let result = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${App_id}&units=Metric`
    );
    result.then(function (value) {
      // console.log(value)
      setTemp(value.data.main.temp);
      setCountry(value.data.sys.country);
      setWeather(value.data.weather[0].main);
      setWind(value.data.wind.speed);
      const weatherIconCode = value.data.weather[0].icon;
      let sample = Weather;
      setIcon(weatherIconMap[weatherIconCode]);
    });
  }

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="search">
            <input
              type="text"
              onChange={HandleCity}
              className="input"
              placeholder="Search City..."
            />
            <img src={Search} alt="icon" onClick={find} className="s-icon" />
          </div>
          <img src={Icon} alt="helo" className="w-pic" />
          <div className="details">
            <div className="heading">
              <img src={temp} alt="" className="upper-pic" />
              <div className="w-deg">{Temp}°C</div>
              <div className="w-name">{Weather}</div>
            </div>
            <div className="heading">
              <img src={wind} alt="" className="upper-pic" />
              <div className="w-speed">{Wind} Km/h</div>
            </div>
            <div className="heading">
              <img src={locate} alt="" className="upper-pic" />
              <div className="c-name">{City}</div>
              <div className="c-country">{Country}</div>
            </div>
          </div>
          <div className="author">devolped by sabeer</div>
        </div>
      </div>
    </>
  );
}

export default App;
