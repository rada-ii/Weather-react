import React, { useState, useEffect } from "react";
import axios from "axios";

function Search({
  city,
  setCity,
  setWeather,
  setHourlyForecast,
  fetchWeatherData,
  handleLocationWeather,
  suggestions,
  setSuggestions,
}) {
  const [error, setError] = useState("");
  const [interacted, setInteracted] = useState(false);

  const fetchCitySuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${input}&limit=5&offset=0&hateoasMode=false`
      );
      setSuggestions(response.data.data.map((city) => city.name));
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (city.length > 0 && interacted) {
      const delayDebounce = setTimeout(() => {
        fetchCitySuggestions(city);
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setSuggestions([]);
    }
  }, [city, interacted]);

  const validateInput = () => {
    if (!city.trim()) {
      setError("City name cannot be empty.");
      setWeather(null); // Clear weather data
      setHourlyForecast(null); // Clear forecast data
      return false;
    }
    setError("");
    return true;
  };

  const onSearchClick = () => {
    if (validateInput()) {
      fetchWeatherData(city);
      setSuggestions([]);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && validateInput()) {
      fetchWeatherData(city);
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (suggestion) => {
    setSuggestions([]);
    setCity(suggestion);
    fetchWeatherData(suggestion);
    setInteracted(false);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setInteracted(true);
        }}
        onKeyPress={onKeyPress}
        className="border border-gray-300 rounded px-4 py-2 mt-4 mb-2 w-1/2 text-center focus:outline-none"
      />
      {interacted && suggestions.length > 0 && (
        <ul className="mx-auto z-10 list-none bg-white rounded shadow-lg max-h-60 overflow-auto w-1/2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-2 space-x-4">
        <button
          onClick={onSearchClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
        <button
          onClick={() => {
            handleLocationWeather();
            setSuggestions([]);
            setError("");
            setInteracted(false);
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get My Location
        </button>
      </div>
    </>
  );
}

export default Search;
