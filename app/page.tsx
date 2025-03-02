"use client";
import React, { useEffect, useState } from "react";
import { Forecast, DailyForecast } from "@/app/forecast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { kindToImageMap, getDayName } from "@/app/utils";

type Location = {
  name: string;
  latitude: number;
  longitude: number;
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [weather, setWeather] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    fetch("/api/get-locations")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations));
  }, []);

  const handleLocationClick = (location: Location) => {
    setLoading(true);
    setSelectedLocation(location);
    fetch(
      `/api/get-weather?latitude=${location.latitude}&longitude=${location.longitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      });
  };

  const handleClearClick = () => {
    setWeather(null);
    setSelectedLocation(null);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-app">
      <header>
        <h1>Weather App</h1>
        <h2>Select a location to see the weather</h2>
      </header>
      <div className="locations">
        {locations.map((location, index) => (
          <div
            key={index}
            className="location-tile"
            onClick={() => handleLocationClick(location)}
          >
            {location.name}
          </div>
        ))}
      </div>
      <div className="weather-info">
        {loading ? (
          <div className="weather-details">
            <Skeleton height={30} width={200} style={{ marginBottom: 10 }} />
            <Skeleton height={30} width={300} style={{ marginBottom: 10 }} />
            <Skeleton height={30} width={250} style={{ marginBottom: 10 }} />
            <Skeleton height={30} width={150} style={{ marginBottom: 10 }} />
            <Skeleton height={30} width={180} style={{ marginBottom: 10 }} />
          </div>
        ) : weather ? (
          <>
            <div className="weather-details">
              <h3>
                Forecast for {getDayName(weather.datetime)} (
                {new Date(weather.datetime).toLocaleDateString()})
              </h3>
              <p className="current-temp">
                Current Temperature: {weather.temperature}°C
              </p>
              <p className="description">{weather.description}</p>
              <p>Feels Like: {weather.feels_like}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind Speed: {weather.wind_speed} km/h</p>
              <p>UV Index: {weather.ultraviolet}</p>
              <p>Precipitation: {weather.precipitation} mm</p>
              <p>
                Chance of Rain:{" "}
                {weather.daily_forecasts[0].hourly_forecasts[0].chances_of_rain}
                %
              </p>
              <p className="min-temp">
                Min Temp: {weather.daily_forecasts[0].lowest_temperature}°C
              </p>
              <p className="max-temp">
                Max Temp: {weather.daily_forecasts[0].highest_temperature}°C
              </p>
              <button className="clear-button" onClick={handleClearClick}>
                Clear
              </button>
              <div className="week-overview">
                {weather.daily_forecasts.map(
                  (dailyForecast: DailyForecast, index: number) => (
                    <div key={index} className="day-forecast">
                      <p>{getDayName(dailyForecast.date)}</p>
                      <Image
                        src={
                          kindToImageMap[dailyForecast.hourly_forecasts[0].kind]
                        }
                        alt={dailyForecast.hourly_forecasts[0].description}
                        width={50}
                        height={50}
                      />
                      <p>{dailyForecast.highest_temperature}°C</p>
                    </div>
                  )
                )}
              </div>
            </div>
            {selectedLocation && (
              <div className="map-container">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: selectedLocation.latitude,
                    lng: selectedLocation.longitude,
                  }}
                  zoom={13}
                  options={{
                    disableDefaultUI: true,
                    draggable: false,
                    zoomControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true,
                  }}
                >
                  <Marker
                    position={{
                      lat: selectedLocation.latitude,
                      lng: selectedLocation.longitude,
                    }}
                  />
                </GoogleMap>
              </div>
            )}
          </>
        ) : (
          <p>Select a location to see the weather information.</p>
        )}
      </div>
    </div>
  );
}
