import moment from "moment-timezone";
import Image from "next/image";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const HourlyWeather = ({ hourlyWeather, timezone }) => {
  console.log(hourlyWeather);
  return (
    <div className="hourly">
      <div className="hourly__inner">
        {hourlyWeather.length > 0 &&
          hourlyWeather.map((weather, index) => (
            <div className="hourly__box-wrapper" key={weather.dt}>
              <div className="hourly__box">
                <span
                  className={`hourly__time ${
                    index == 0 ? "hourly__time--now" : ""
                  }`}
                >
                  {index == 0
                    ? "Now"
                    : moment.unix(weather.dt).tz(timezone).format("LT")}
                </span>

                <Image
                  src={`${publicRuntimeConfig.next_hosturl}/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width="100"
                  height="100"
                />

                <span>{weather.temp.toFixed(0)}&deg;C</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
