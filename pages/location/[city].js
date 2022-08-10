import React from "react";
import cities from "../../lib/city.list.json";
import getConfig from "next/config";
import Head from "next/head";
import moment from "moment-timezone";
import TodaysWeather from "../../components/TodaysWeather";
import HourlyWeather from "../../components/HourlyWeather/HourlyWeather";
import Header from "../../components/header";
import WeeklyWeather from "../../components/WeeklyWeather";
const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  const slug = context.params.city;
  if (!city) {
    return {
      notFound: true,
    };
  }
  const cityData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&APPID=${publicRuntimeConfig.next_apikey}&exclude=minutely&units=metric`
  );
  const data = await cityData.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  return {
    props: {
      city: city,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
      timezone: data.timezone,
    },
  };
}

const getCity = (params) => {
  const cityParam = params.trim();
  // get the id of the city
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];
  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);
  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDAy = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDAy / 1000);

  const todayData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todayData;
};

export default function City({
  city,
  currentWeather,
  dailyWeather,
  hourlyWeather,
  timezone,
}) {
  return (
    <div className="mx-5">
      <Head>
        <title>{city.name} - Bizio Weather App</title>
      </Head>
      <div>
        <TodaysWeather
          city={city}
          weather={dailyWeather[0]}
          timezone={timezone}
        />
        <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
        <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
      </div>
    </div>
  );
}
