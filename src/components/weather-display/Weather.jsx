import React from "react";

function Weather({ weather, currentTime }) {
  const { main, sys, wind, weather: weatherInfo } = weather;

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</p>
      <p className="text-2xl font-bold my-6">{weather.name}</p>
      <p className="text-xl font-semibold">
        Temperature: <span className="font-bold">{main.temp}°C</span>
      </p>
      <p>Min Temperature: {main.temp_min}°C</p>
      <p>Max Temperature: {main.temp_max}°C</p>
      <p>Feels Like: {main.feels_like}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Weather: {weatherInfo[0].main}</p>

      <img
        src={`http://openweathermap.org/img/w/${weatherInfo[0].icon}.png`}
        alt={weatherInfo[0].main}
        className="w-40"
      />
    </div>
  );
}

export default Weather;
