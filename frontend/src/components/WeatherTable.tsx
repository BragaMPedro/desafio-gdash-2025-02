import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CodigoClimaWMO, DescricaoClima, type WeatherDataResponse } from "@/types";
interface WeatherTableProps {
   weatherData: WeatherDataResponse[];
}
export const WeatherTable = ({ weatherData }: WeatherTableProps) => {
   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead>Data</TableHead>
               <TableHead>Hora</TableHead>
               <TableHead>Temperatura</TableHead>
               <TableHead>Umidade</TableHead>
               <TableHead>Prob. de Chuva</TableHead>
               <TableHead>Cobertura de Nuvens</TableHead>
               <TableHead>Velocidade do Vento</TableHead>
               <TableHead>Clima</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {weatherData.map(data => (
               <TableRow key={data._id}>
                  <TableCell>{new Date(data.timestamp * 1000).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(data.timestamp * 1000).toLocaleTimeString()}</TableCell>
                  <TableCell>{data.temperature?.toFixed(2)}°C</TableCell>
                  <TableCell>{data.humidity}%</TableCell>
                  <TableCell>{data.precipitation_probability}%</TableCell>
                  <TableCell>{data.cloud_cover}%</TableCell>
                  <TableCell>{data.wind_speed.toFixed(2)}km/h</TableCell>
                  <TableCell>{DescricaoClima[data.weather_code as CodigoClimaWMO]}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};
