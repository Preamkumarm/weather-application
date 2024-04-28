import "./app.css";
import { useState } from "react";
import axios from "axios";

import Search from "./img/search.png";
import temp from "./img/temp.png";
import locate from "./img/location.png";
import wind from "./img/wind.png";

import bg from "./img/bg2.jpg"
import Drizzle from "./img/drizzle.jpg";
import Rain from "./img/rain.jpg";
import Clear from "./img/clear.jpg";
import Snow from "./img/snow.jpg";
import Thunderstrom from "./img/thunderstrom.jpg";
import Clouds from "./img/cloud.jpg";

function App() {  
  const [Icon, setIcon] = useState(bg);
  const [Temp, setTemp] = useState(0);
  const [City, setCity] = useState("Tenkasi");
  const [Country, setCountry] = useState("IN");
  const [Weather, setWeather] = useState("Weather...?");
  const [Wind, setWind] = useState(0);
  const [location, setLocation] = useState("...")

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
    "50n": Snow,
  };
  function find() {
    const App_id = "6be94f68890728a5fd01a5fd8b44ee35";
    let result = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${App_id}&units=Metric`
    );
    result.then(function (value) {
      console.log(value);
      setTemp(value.data.main.temp);
      setCountry(value.data.sys.country);
      setWeather(value.data.weather[0].main);
      setWind(value.data.wind.speed);
      const weatherIconCode = value.data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode]);
      setLocation(value.data.name)
    });
  }

  return (
    <>
      <div className="body">
        <img src={Icon} alt="bg" className="bg" />
        <div className="main">
            <div className="search">
              <div></div>
              <input
                type="text"
                onChange={HandleCity}
                className="input"
                placeholder="Search City..."
              />
              <img src={Search} alt="icon" onClick={find} className="s-icon" />
            </div>
            <div className="picture">
              <div className="w-name">{Weather}</div>
            </div>
            <div className="box">
              <div className="in-box"></div>
              
              <div className="heading">
                <img src={temp} alt="" className="upper-pic" />
                <div className="w-deg">{Temp}°C</div>
              </div>
              <div className="heading">
                <img src={wind} alt="" className="upper-pic" />
                <div className="w-speed">{Wind} Km/h</div>
              </div>
              <div className="heading">
                <img src={locate} alt="" className="upper-pic" />
                <div className="locating">
                  <div className="c-name">{location}, </div>
                  <div className="c-name">{Country}</div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </>
  );
}

export default App;
