// App.js
import React, { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import Location from "./components/Location";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import { getFormattedWeatherData } from "./services/Weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState({});
  const [units, setUnits] = useState("metric"); // or "imperial" for Fahrenheit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { units, ...otherParams } = query;
        const data = await getFormattedWeatherData({ ...otherParams, units });
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchData();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md my-4 py-5 px-32 bg-gradient-to-br from-cyan-700 via-sky-300 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weatherData && (
        <>
          <Location weather={weatherData} />
          <Temperature weather={weatherData} />
          <Forecast title="Hourly Forecast" items={weatherData.hourly} />
          <Forecast title="Daily Forecast" items={weatherData.daily} />
        </>
      )}
    </div>
  );
}

export default App;
