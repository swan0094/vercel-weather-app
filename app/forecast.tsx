export enum HeatIndex {
  CAUTION,
  DANGER,
  EXTREME_CAUTION,
  EXTREME_DANGER,
}

export type HourlyForecast = {
  chances_of_fog: number;
  chances_of_frost: number;
  chances_of_high_temperature: number;
  chances_of_overcast: number;
  chances_of_rain: number;
  chances_of_remaining_dry: number;
  chances_of_snow: number;
  chances_of_sunshine: number;
  chances_of_thunder: number;
  chances_of_windy: number;
  cloud_cover: number;
  description: string;
  dew_point: number;
  feels_like: number;
  heat_index: HeatIndex;
  humidity: number;
  kind: Kind;
  precipitation: number;
  pressure: number;
  temperature: number;
  time: Date;
  ultraviolet: UltraViolet;
  visibility: number;
  wind_chill: number;
  wind_direction: WindDirection;
  wind_gust: number;
  wind_speed: number;
};

export enum Phase {
  FIRST_QUARTER = "First Quarter",
  FULL_MOON = "Full Moon",
  LAST_QUARTER = "Last Quarter",
  NEW_MOON = "New Moon",
  WANING_CRESCENT = "Waning Crescent",
  WANING_GIBBOUS = "Waning Gibbous",
  WAXING_CRESCENT = "Waxing Crescent",
  WAXING_GIBBOUS = "Waxing Gibbous",
}

export type DailyForecast = {
  date: Date;
  highest_temperature: number;
  hourly_forecasts: HourlyForecast[];
  lowest_temperature: number;
  moon_illumination: number;
  moon_phase: Phase;
  moonrise: Date | null;
  moonset: Date | null;
  snowfall: number;
  sunlight: number;
  sunrise: Date | null;
  sunset: Date | null;
  temperature: number;
};

export enum Kind {
  CLOUDY = 119,
  FOG = 143,
  HEAVY_RAIN = 302,
  HEAVY_SHOWERS = 299,
  HEAVY_SNOW = 230,
  HEAVY_SNOW_SHOWERS = 335,
  LIGHT_RAIN = 266,
  LIGHT_SHOWERS = 176,
  LIGHT_SLEET = 182,
  LIGHT_SLEET_SHOWERS = 179,
  LIGHT_SNOW = 227,
  LIGHT_SNOW_SHOWERS = 323,
  PARTLY_CLOUDY = 116,
  SUNNY = 113,
  THUNDERY_HEAVY_RAIN = 389,
  THUNDERY_SHOWERS = 200,
  THUNDERY_SNOW_SHOWERS = 392,
  VERY_CLOUDY = 122,
}

export enum UltraViolet {
  EXTREME,
  HIGH,
  LOW,
  MODERATE,
  VERY_HIGH,
}

export enum WindDirection {
  EAST = "E",
  EAST_NORTHEAST = "ENE",
  EAST_SOUTHEAST = "ESE",
  NORTH = "N",
  NORTHEAST = "NE",
  NORTHWEST = "NW",
  NORTH_NORTHEAST = "NNE",
  NORTH_NORTHWEST = "NNW",
  SOUTH = "S",
  SOUTHEAST = "SE",
  SOUTHWEST = "SW",
  SOUTH_SOUTHEAST = "SSE",
  SOUTH_SOUTHWEST = "SSW",
  WEST = "W",
  WEST_NORTHWEST = "WNW",
  WEST_SOUTHWEST = "WSW",
}

export type Forecast = {
  coordinates: [number, number];
  country: string;
  daily_forecasts: DailyForecast[];
  datetime: Date;
  description: string;
  feels_like: number;
  humidity: number;
  kind: Kind;
  local_population: number;
  location: string;
  precipitation: number;
  pressure: number;
  region: string;
  temperature: number;
  ultraviolet: UltraViolet;
  visibility: number;
  wind_direction: WindDirection;
  wind_speed: number;
};
