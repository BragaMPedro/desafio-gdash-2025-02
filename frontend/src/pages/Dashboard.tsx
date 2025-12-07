import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeatherData } from "@/services/api";
import { CodigoClimaWMO, DescricaoClima, type WeatherCard, type WeatherDataResponse } from "@/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [weatherData, setWeatherData] = useState<WeatherDataResponse[]>([]);
   const [latestWeather, setLatestWeather] = useState<WeatherCard>({} as WeatherCard);

   useEffect(() => {
      fetchWeatherData();
   }, []);

   const fetchWeatherData = async () => {
      setIsLoading(true);

      try {
         const res = await getWeatherData();
         setWeatherData(res.data);

         const latest = res.data[res.data.length - 1];
         setLatestWeather({
            temperature: { title: "Temperatura", value: latest.temperature, unit: "°C" },
            humidity: { title: "Umidade", value: latest.humidity, unit: "%" },
            precipitation_probability: {
               title: "Probabilidade de Precipitação",
               value: latest.precipitation_probability,
                unit: "%"
            },
            wind_speed: { title: "Velocidade do Vento", value: latest.wind_speed.toFixed(2), unit: "km/h" },
            cloud_cover: { title: "Cobertura de Nuvens", value: latest.cloud_cover, unit: "%" },
            weather_code: { title: "Código do Clima", value: DescricaoClima[latest.weather_code as CodigoClimaWMO] },
          timestamp: { title: "Timestamp", value: new Date(latest.timestamp * 1000).toLocaleString() },
         });
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="p-8 space-y-4">
         <h1 className="text-3xl font-bold">Dashboard</h1>
         <p>Última atualização: {latestWeather.timestamp?.value}</p>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(latestWeather).map((element, index) => {
              if(element.title === "Timestamp") return;
               return (
               <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{element.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{element.value} {element?.unit}</div>
                  </CardContent>
               </Card>
            );
            })}
         </div>
      </div>
   );
}
