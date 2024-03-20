import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "e6e2cdfe7bdee820d5bd0789ccd06089";
  const apiUrl = "https://api.openweathermap.org/data/2.5";

  const fetchWeatherData = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/weather?q=${query}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `${apiUrl}/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setLoading(false);
    }
  };

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
        `${apiUrl}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
      );
      setCity(response.data.name);
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `${apiUrl}/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location weather data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Sabac");
  }, []);

  return (
    <div className="container mx-auto text-center mt-4">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="border border-gray-300 rounded px-4 py-2 mt-4 mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <button
        onClick={handleLocationWeather}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
      >
        Get My Location
      </button>

      {loading && <p>Loading...</p>}

      {weather && <Weather weather={weather} />}

      {hourlyForecast && <HourlyForecast hourlyForecast={hourlyForecast} />}
    </div>
  );
}

export default App;
