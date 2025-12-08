import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface WeatherCardProps {
   title: string;
   value: number|string;
   unit?: string;
}
export const WeatherCard = (weather: WeatherCardProps) => {
   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{weather.title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">
               {weather.value} {weather?.unit}
            </div>
         </CardContent>
      </Card>
   );
};
