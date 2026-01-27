import { CloudIcon, DropletsIcon, ThermometerSunIcon, UmbrellaIcon, WindIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
interface WeatherCardProps {
   title: string;
   value: number | string;
   unit?: string;
}
export const WeatherCard = (weather: WeatherCardProps) => {
   const icon = iconSelector(weather.title);

   function iconSelector(title: string) {
      switch (title) {
         case "Temperatura":
            return <ThermometerSunIcon />;
         case "Umidade":
            return <DropletsIcon />;
         case "Probabilidade de Precipitação":
            return <UmbrellaIcon />;
         case "Velocidade do Vento":
            return <WindIcon />;
         case "Cobertura de Nuvens":
            return <CloudIcon />;
         default:
            return "";
      }
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Card className="justify-center">
               {/* <CardHeader>
            <CardTitle className="text-sm font-medium">{weather.title}</CardTitle>
         </CardHeader> */}
               <CardContent className="flex flex-row items-center justify-center gap-4">
                  {icon}
                  <div className="text-lg font-bold">
                     {weather.value} {weather?.unit}
                  </div>
               </CardContent>
            </Card>
         </TooltipTrigger>
         <TooltipContent side="bottom">{weather.title}</TooltipContent>
      </Tooltip>
   );
};
