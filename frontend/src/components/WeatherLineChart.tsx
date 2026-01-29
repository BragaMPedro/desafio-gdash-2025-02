import { type WeatherDataResponse } from "@/types";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const WeatherLineChart = ({ weatherData }: { weatherData: WeatherDataResponse[] }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels: weatherData.map(item => new Date(item.timestamp * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperatura',
        data: weatherData.map(item => item.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Umidade',
        data: weatherData.map(item => item.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
      },
      {
        label: 'Probabilidade de Precipitação',
        data: weatherData.map(item => item.precipitation_probability),
        borderColor: 'rgb(75, 130, 220)',
        backgroundColor: 'rgba(75, 130, 220, 0.2)',
      },
      {
        label: 'Velocidade do Vento',
        data: weatherData.map(item => item.wind_speed),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Cobertura de Nuvens',
        data: weatherData.map(item => item.cloud_cover),
        borderColor: 'rgb(201, 203, 201)',
        backgroundColor: 'rgba(201, 203, 201, 0.2)',
      },
    ],
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Dados Climáticos Recentes',
    },
  },
};

  return (
      <Line data={chartData} options={options} />
  )
}