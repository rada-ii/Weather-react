// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/serach/Search";
import WeatherDisplay from "./components/wather-display/Weather";
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchWeatherData = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=e6e2cdfe7bdee820d5bd0789ccd06089&units=metric`
      );
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=e6e2cdfe7bdee820d5bd0789ccd06089&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Sabac");
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    fetchWeatherData(city);
  };

  const handleLocationWeather = async () => {
    try {
      setLoading(true);
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e6e2cdfe7bdee820d5bd0789ccd06089&units=metric`
      );
      setCity(response.data.name);
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e6e2cdfe7bdee820d5bd0789ccd06089&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location weather data: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto text-center bg-gradient-to-r from-yellow-300 from-1% via-sky-500 to-emerald-500 via-70%  to-red-300 to-90% ">
      <div className=" p-2 rounded-md">
        <Search
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          handleLocationWeather={handleLocationWeather}
        />
        {loading && <p>Loading...</p>}
        {weather && (
          <WeatherDisplay weather={weather} currentTime={currentTime} />
        )}
        {hourlyForecast && <HourlyForecast hourlyForecast={hourlyForecast} />}
      </div>
    </div>
  );
}

export default App;
