export const kindToImageMap: { [key: string]: string } = {
  CLOUDY: "/public/overcast.png",
  FOG: "/public/fog.png",
  HEAVY_RAIN: "/public/raining.png",
  HEAVY_SHOWERS: "/public/raining.png",
  HEAVY_SNOW: "/public/snow.png",
  HEAVY_SNOW_SHOWERS: "/public/snow.png",
  LIGHT_RAIN: "/public/raining.png",
  LIGHT_SHOWERS: "/public/raining.png",
  LIGHT_SLEET: "/public/raining.png",
  LIGHT_SLEET_SHOWERS: "/public/raining.png",
  LIGHT_SNOW: "/public/snow.png",
  LIGHT_SNOW_SHOWERS: "/public/snow.png",
  PARTLY_CLOUDY: "/public/overcast.png",
  SUNNY: "/public/sunny.png",
  THUNDERY_HEAVY_RAIN: "/public/lightning.png",
  THUNDERY_SHOWERS: "/public/lightning.png",
  THUNDERY_SNOW_SHOWERS: "/public/lightning.png",
  VERY_CLOUDY: "/public/overcast.png",
};

export const getDayName = (date: Date) => {
  return new Date(date).toLocaleDateString("en-AU", { weekday: "long" });
};
