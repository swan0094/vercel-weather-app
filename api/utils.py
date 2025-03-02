from models.forecast import DailyForecast, HourlyForecast

def serialize_daily_forecast(daily_forecast: DailyForecast) -> dict:
    return {
        "date": daily_forecast.date.isoformat(),
        "highest_temperature": daily_forecast.highest_temperature,
        "hourly_forecasts": [serialize_hourly_forecast(hf) for hf in daily_forecast.hourly_forecasts],
        "lowest_temperature": daily_forecast.lowest_temperature,
        "moon_illumination": daily_forecast.moon_illumination,
        "moon_phase": daily_forecast.moon_phase.name,
        "moonrise": daily_forecast.moonrise.isoformat() if daily_forecast.moonrise else None,
        "moonset": daily_forecast.moonset.isoformat() if daily_forecast.moonset else None,
        "snowfall": daily_forecast.snowfall,
        "sunlight": daily_forecast.sunlight,
        "sunrise": daily_forecast.sunrise.isoformat() if daily_forecast.sunrise else None,
        "sunset": daily_forecast.sunset.isoformat() if daily_forecast.sunset else None,
        "temperature": daily_forecast.temperature
    }

def serialize_hourly_forecast(hourly_forecast: HourlyForecast) -> dict:
    return {
        "chances_of_fog": hourly_forecast.chances_of_fog,
        "chances_of_frost": hourly_forecast.chances_of_frost,
        "chances_of_high_temperature": hourly_forecast.chances_of_high_temperature,
        "chances_of_overcast": hourly_forecast.chances_of_overcast,
        "chances_of_rain": hourly_forecast.chances_of_rain,
        "chances_of_remaining_dry": hourly_forecast.chances_of_remaining_dry,
        "chances_of_snow": hourly_forecast.chances_of_snow,
        "chances_of_sunshine": hourly_forecast.chances_of_sunshine,
        "chances_of_thunder": hourly_forecast.chances_of_thunder,
        "chances_of_windy": hourly_forecast.chances_of_windy,
        "cloud_cover": hourly_forecast.cloud_cover,
        "description": hourly_forecast.description,
        "dew_point": hourly_forecast.dew_point,
        "feels_like": hourly_forecast.feels_like,
        "heat_index": hourly_forecast.heat_index.name,
        "humidity": hourly_forecast.humidity,
        "kind": hourly_forecast.kind.name,
        "precipitation": hourly_forecast.precipitation,
        "pressure": hourly_forecast.pressure,
        "temperature": hourly_forecast.temperature,
        "time": hourly_forecast.time.isoformat(),
        "ultraviolet": hourly_forecast.ultraviolet.name,
        "visibility": hourly_forecast.visibility,
        "wind_chill": hourly_forecast.wind_chill,
        "wind_direction": hourly_forecast.wind_direction.name,
        "wind_gust": hourly_forecast.wind_gust,
        "wind_speed": hourly_forecast.wind_speed
    }