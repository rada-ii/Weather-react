// WeatherService.js
import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = "e6e2cdfe7bdee820d5bd0789ccd06089";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  try {
    const url = `${BASE_URL}/${infoType}`;
    const params = { ...searchParams, appid: API_KEY };
    console.log("API Request URL:", url);
    console.log("Request Parameters:", params);
    const response = await axios.get(url, { params });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw new Error("Failed to fetch weather data");
  }
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const { units, ...otherParams } = searchParams;
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      otherParams
    );

    if (!formattedCurrentWeather || !formattedCurrentWeather.coord) {
      throw new Error("Failed to fetch current weather data");
    }

    const { lat, lon } = formattedCurrentWeather.coord;

    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units,
      ...otherParams,
    });

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching formatted weather data:", error.message);
    throw new Error("Failed to fetch formatted weather data");
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  const formattedTime = DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(format);
  console.log("Formatted local time:", formattedTime);
  return formattedTime;
};

const iconUrlFromCode = (code) => {
  const url = `http://openweathermap.org/img/wn/${code}@2x.png`;
  console.log("Icon URL:", url);
  return url;
};

export {
  getFormattedWeatherData,
  formatToLocalTime,
  iconUrlFromCode,
  getWeatherData,
};
