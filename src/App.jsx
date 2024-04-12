import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/search/Search";
import WeatherDisplay from "./components/weather-display/Weather";
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";
import WeatherService from "./components/service/WeatherService";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);

  const { fetchWeatherData, handleLocationWeather } = WeatherService({
    setCity,
    setWeather,
    setHourlyForecast,
    setLoading,
    setError,
    setSuggestions,
  });

  useEffect(() => {
    handleLocationWeather();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto text-center bg-gradient-to-r from-yellow-300 from-1% via-sky-500 to-emerald-500 via-70%  to-red-300 to-90%">
      <div className="p-2 rounded-md">
        <Search
          city={city}
          setCity={setCity}
          fetchWeatherData={fetchWeatherData}
          handleLocationWeather={handleLocationWeather}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        {error && (
          <p className="text-red-500 my-10 font-bold text-3xl">{error}</p>
        )}
        {loading && (
          <p className="text-black my-10 font-bold text-3xl">Loading...</p>
        )}
        {!loading && weather && (
          <WeatherDisplay weather={weather} currentTime={currentTime} />
        )}
        {!loading && hourlyForecast && (
          <HourlyForecast hourlyForecast={hourlyForecast} />
        )}
      </div>
    </div>
  );
}

export default App;
