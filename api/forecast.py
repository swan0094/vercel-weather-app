from dataclasses import dataclass
from typing import Tuple, List, Optional
from datetime import datetime, date, time
from python_weather.enums import Kind, UltraViolet, WindDirection, Phase, HeatIndex

@dataclass
class HourlyForecast:
    chances_of_fog: int
    chances_of_frost: int
    chances_of_high_temperature: int
    chances_of_overcast: int
    chances_of_rain: int
    chances_of_remaining_dry: int
    chances_of_snow: int
    chances_of_sunshine: int
    chances_of_thunder: int
    chances_of_windy: int
    cloud_cover: int
    description: str
    dew_point: int
    feels_like: int
    heat_index: HeatIndex
    humidity: int
    kind: Kind
    precipitation: float
    pressure: float
    temperature: int
    time: time
    ultraviolet: UltraViolet
    visibility: int
    wind_chill: int
    wind_direction: WindDirection
    wind_gust: int
    wind_speed: int

@dataclass
class DailyForecast:
    date: date
    highest_temperature: int
    hourly_forecasts: List[HourlyForecast]
    lowest_temperature: int
    moon_illumination: int
    moon_phase: Phase
    moonrise: Optional[time]
    moonset: Optional[time]
    snowfall: float
    sunlight: float
    sunrise: Optional[time]
    sunset: Optional[time]
    temperature: int

@dataclass
class Forecast:
    coordinates: Tuple[float, float]
    country: str
    daily_forecasts: List[DailyForecast]
    datetime: datetime
    description: str
    feels_like: int
    humidity: int
    kind: Kind
    local_population: int
    location: str
    precipitation: float
    pressure: float
    region: str
    temperature: int
    ultraviolet: UltraViolet
    visibility: int
    wind_direction: WindDirection
    wind_speed: int