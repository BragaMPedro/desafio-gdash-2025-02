import { PaginationComponent } from "@/components/PaginationComponent";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherTable } from "@/components/WeatherTable";
import { getWeatherData } from "@/services/api";
import { CodigoClimaWMO, DescricaoClima, type WeatherData, type WeatherDataResponse } from "@/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [weatherData, setWeatherData] = useState<WeatherDataResponse[]>([]);
   const [latestWeather, setLatestWeather] = useState<WeatherData>({} as WeatherData);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      fetchWeatherData();
   }, [currentPage]);

   const fetchWeatherData = async () => {
      setIsLoading(true);

      try {
         const res = await getWeatherData(currentPage);

         const responseData = res.data.data
         const meta = res.data.meta;
         setTotalPages(meta.lastPage);
         setWeatherData(responseData);

         const latest = responseData[0];
         setLatestWeather({
            temperature: { title: "Temperatura", value: latest.temperature?.toFixed(2), unit: "°C" },
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
                <WeatherCard key={index} title={element.title} value={element.value} unit={element.unit} />
               );
            })}
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Histórico Climático</CardTitle>
            </CardHeader>
            <CardContent>
               <WeatherTable weatherData={weatherData} />
            </CardContent>
            <CardFooter>
               <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </CardFooter>
         </Card>
      </div>
   );
}
