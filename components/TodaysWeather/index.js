import moment from "moment-timezone";
import React from "react";
import Image from "next/image";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const TodaysWeather = ({ city, weather, timezone }) => {
  //const sunrise =
  console.log(weather);
  return (
    <div className="today">
      <div className="today__inner">
        <div className="today__left-content">
          <h1>
            {city.name}({city.country})
          </h1>
          <h2>
            <span>{weather.temp.max.toFixed(0)}&deg;C</span>
            <span>{weather.temp.min.toFixed(0)}&deg;C</span>
          </h2>
          <div className="today__sun-times">
            <div>
              <span>Sunrise</span>
              <span>
                {moment.unix(weather.sunrise).tz(timezone).format("LT")}
              </span>
            </div>
            <div>
              <span>Sunset</span>
              <span>
                {moment.unix(weather.sunset).tz(timezone).format("LT")}
              </span>
            </div>
            <div>
              <span>Wind</span>
              <span className="text-center">{weather.wind_speed}</span>
            </div>
            <div>
              <span>Humidity</span>
              <span className="text-center">{weather.humidity}</span>
            </div>
            <div>
              <span>Rain</span>
              <span className="text-center">{weather.rain}</span>
            </div>
            <div>
              <span>Pressure</span>
              <span className="text-center">{weather.pressure}</span>
            </div>
          </div>
        </div>
        <div className="today__left-content">
          <div className="today__icon-wrapper">
            <div>
              <Image
                src={`${publicRuntimeConfig.next_hosturl}/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].main}
                layout="fill"
              />
              {/*  */}
            </div>
          </div>
          <h3>
            {weather.weather[0].description}
            {/*  */}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
