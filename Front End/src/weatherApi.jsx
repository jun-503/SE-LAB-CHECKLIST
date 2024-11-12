import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true"
        );
        setWeatherData(response.data.current_weather);
        setLoading(false);
      } catch (err) {
        // Handle any errors
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array means this will only run once when the component mounts

  // Render loading, error, or weather data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Destructure data from weatherData
  const { temperature, wind_speed, weathercode } = weatherData;

  return (
    <div>
      <h1>Current Weather</h1>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {wind_speed} m/s</p>
      <p>Weather Code: {weathercode}</p>
    </div>
  );
};

export default WeatherApp;
