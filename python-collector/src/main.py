import json
import os
import openmeteo_requests
import requests_cache
from retry_requests import retry


# Setup the Open-Meteo API client with a cache and retry mechanism
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

url = "https://api.open-meteo.com/v1/forecast"


def get_weather_data():
    try:
        params = {
            "latitude": -22.5046,
            "longitude": -43.1823,
            "current": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "cloud_cover", "wind_speed_10m", "weather__code"],
        }
        response = openmeteo.weather_api(url, params=params)
        current = response.Current()

        data = {
            "temp": current.Variables(0).Value(),
            "humidity": current.Variables(1).Value(),
            "precipitation_probability": current.Variables(2).Value(),
            "cloud_cover": current.Variables(3).Value(),
            "wind_speed": current.Variables(4).Value(),
            "weather__code": current.Variables(5).Value(),
            "timestamp": current.Time()
        }
        return data
    except Exception as e:
        print(f"Erro ao buscar clima: {e}")
        return None
