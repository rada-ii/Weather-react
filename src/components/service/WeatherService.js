import axios from "axios";

function WeatherService({
  setCity,
  setWeather,
  setHourlyForecast,
  setLoading,
  setError,
  setSuggestions,
}) {
  const apiKey = "e6e2cdfe7bdee820d5bd0789ccd06089";

  const fetchWeatherData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setError(null);
      setSuggestions([]);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setWeather(null);
      setHourlyForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationWeather = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
      );
      setCity(response.data.name);
      setWeather(response.data);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 4));
      setError(null);
      setSuggestions([]);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setWeather(null);
      setHourlyForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeatherData, handleLocationWeather };
}

export default WeatherService;
