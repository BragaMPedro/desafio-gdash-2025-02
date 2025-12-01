import json
import os
import time
import pika
import openmeteo_requests
import requests_cache
from retry_requests import retry

AMQP_URL = os.getenv("AMQP_URL", "amqp://guest:guest@localhost:5672/")
LATITUDE = float(os.getenv("LATITUDE", "-22.5046"))
LONGITUDE = float(os.getenv("LONGITUDE", "-43.1823"))
QUEUE_NAME = "weather_queue"
FETCH_INTERVAL_SECONDS = 60

# --- Open-Meteo API Setup ---
cache_session = requests_cache.CachedSession('.cache', expire_after=3300)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)
meteo_url = "https://api.open-meteo.com/v1/forecast"


def get_weather_data():
    try:
        params = {
            "latitude": LATITUDE,
            "longitude": LONGITUDE,
            "current": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "cloud_cover", "wind_speed_10m", "weather_code"],
        }
        response = openmeteo.weather_api(meteo_url, params=params)[0]
        current = response.Current()

        data = {
            "temperature": current.Variables(0).Value(),
            "humidity": current.Variables(1).Value(),
            "precipitation_probability": current.Variables(2).Value(),
            "cloud_cover": current.Variables(3).Value(),
            "wind_speed": current.Variables(4).Value(),
            "weather_code": current.Variables(5).Value(),
            "timestamp": current.Time(),
            "latitude": LATITUDE,
            "longitude": LONGITUDE,
        }
        print(f"Fetched weather data: {data}")
        return data
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return None


def send_to_rabbitmq(data):
    try:
        connection = pika.BlockingConnection(pika.URLParameters(AMQP_URL))
        channel = connection.channel()
        channel.queue_declare(queue=QUEUE_NAME, durable=True)

        message = json.dumps(data, default=str)
        channel.basic_publish(
            exchange='',
            routing_key=QUEUE_NAME,
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2,  # make message persistent
            ))
        print(f"Sent message to RabbitMQ: {message}")
        connection.close()
        return True
    except pika.exceptions.AMQPConnectionError as e:
        print(f"Error connecting to RabbitMQ: {e}")
        return False
    except Exception as e:
        print(f"An unexpected error occurred with RabbitMQ: {e}")
        return False


def main():
    print("--- Starting Weather Collector ---")
    while True:
        weather_data = get_weather_data()
        if weather_data:
            if not send_to_rabbitmq(weather_data):
                print("Failed to send data to RabbitMQ. Retrying in a moment...")
                # Simple backoff, consider more robust strategy for production
                time.sleep(10)

        print(
            f"Waiting for {FETCH_INTERVAL_SECONDS} seconds before next fetch...")
        time.sleep(FETCH_INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
