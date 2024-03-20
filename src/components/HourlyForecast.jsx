import React from "react";

function HourlyForecast({ hourlyForecast }) {
  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold my-8">Hourly Forecast</h2>
      <div className="grid lg:grid-cols-4 grid-cols-1 ">
        {hourlyForecast.map((item) => (
          <div key={item.dt}>
            <p className="font-extrabold">
              {new Date(item.dt * 1000).toLocaleTimeString()}
            </p>
            <p>{item.main.temp}°C</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Wind: {item.wind.speed} m/s</p>
            <p>Weather: {item.weather[0].main}</p>
            <img
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt={item.weather[0].main}
              className="mx-auto w-36"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
