from utils import serialize_daily_forecast, serialize_hourly_forecast
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from cachetools import TTLCache
import python_weather
import asyncio
import json

cache = TTLCache(maxsize=100, ttl=600)

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == "/api/get-locations":
            self.get_locations()
        elif parsed_path.path == "/api/get-weather":
            self.get_weather()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"error": "Not Found"}')

    def get_locations(self):
        locations = [
            {"name": "Cumbria", "latitude": 54.4609, "longitude": -3.0886},
            {"name": "Corfe Castle", "latitude": 50.6395, "longitude": -2.0566},
            {"name": "The Cotswolds", "latitude": 51.8330, "longitude": -1.8433},
            {"name": "Cambridge", "latitude": 52.2053, "longitude": 0.1218},
            {"name": "Bristol", "latitude": 51.4545, "longitude": -2.5879},
            {"name": "Oxford", "latitude": 51.7520, "longitude": -1.2577},
            {"name": "Norwich", "latitude": 52.6309, "longitude": 1.2974},
            {"name": "Stonehenge", "latitude": 51.1789, "longitude": -1.8262},
            {"name": "Watergate Bay", "latitude": 50.4429, "longitude": -5.0553},
            {"name": "Birmingham", "latitude": 52.4862, "longitude": -1.8904}
        ]
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"locations": locations}).encode('utf-8'))

    def get_weather(self):
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        latitude = query_params.get("latitude", [None])[0]
        longitude = query_params.get("longitude", [None])[0]

        if not latitude or not longitude:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"error": "Missing latitude or longitude"}')
            return

        location = f"{latitude},{longitude}"

        if location in cache:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(cache[location]).encode('utf-8'))
            return

        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            weather = loop.run_until_complete(self.fetch_weather(location))
            cache[location] = weather
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(weather).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

    async def fetch_weather(self, location):
        async with python_weather.Client() as client:
            weather = await client.get(location)
            forecast = {
                "coordinates": location.split(","),
                "country": weather.country,
                "daily_forecasts": [serialize_daily_forecast(df) for df in weather.daily_forecasts],
                "datetime": weather.datetime.isoformat(),
                "description": weather.description,
                "feels_like": weather.feels_like,
                "humidity": weather.humidity,
                "kind": weather.kind.name,
                "local_population": weather.local_population,
                "location": weather.location,
                "precipitation": weather.precipitation,
                "pressure": weather.pressure,
                "region": weather.region,
                "temperature": weather.temperature,
                "ultraviolet": weather.ultraviolet.name,
                "visibility": weather.visibility,
                "wind_direction": weather.wind_direction.name,
                "wind_speed": weather.wind_speed
            }
            return forecast