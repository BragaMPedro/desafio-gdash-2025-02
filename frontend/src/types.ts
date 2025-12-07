export interface WeatherDataResponse {
    _id: string;
   temperature: number;
   humidity: number;
   precipitation_probability: number;
   cloud_cover: number;
   wind_speed: number;
   weather_code: number;
   timestamp: number;
   latitude: number;
   longitude: number;
   __v: number;
};

export interface WeatherData {
    temperature: WeatherParam;
    humidity: WeatherParam
   precipitation_probability: WeatherParam;
   cloud_cover: WeatherParam;
   wind_speed: WeatherParam;
   weather_code: WeatherParam;
   timestamp: WeatherParam;
}

export interface WeatherParam {
    title: string;
    value: number|string;
    unit?: string;
}

// export interface WeatherParam {
//     title: WeatherTitle[keyof typeof WeatherTitle];
//     value: number;
// }

export enum WeatherParamTitle {
    TEMPERATURE = "Temperatura",
    HUMIDITY = "Umidade",
    PRECIPITATION_PROBABILITY = "Probabilidade de Precipitação",
    CLOUD_COVER = "Cobertura de Nuvens",
    WIND_SPEED = "Velocidade do Vento",
    WEATHER_CODE = "Código do Clima"
}

export enum CodigoClimaWMO {
  CEU_LIMPO = 0,
  PRINCIPALMENTE_LIMPO = 1,
  PARCIALMENTE_NUBLADO = 2,
  ENCOBERTO = 3,
  NEVOEIRO = 45,
  NEVOEIRO_COM_SINCELO = 48,
  CHUVISCO_LEVE = 51,
  CHUVISCO_MODERADO = 53,
  CHUVISCO_DENSO = 55,
  CHUVISCO_CONGELANTE_LEVE = 56,
  CHUVISCO_CONGELANTE_DENSO = 57,
  CHUVA_FRACA = 61,
  CHUVA_MODERADA = 63,
  CHUVA_FORTE = 65,
  CHUVA_CONGELANTE_LEVE = 66,
  CHUVA_CONGELANTE_FORTE = 67,
  NEVE_FRACA = 71,
  NEVE_MODERADA = 73,
  NEVE_FORTE = 75,
  GRAOS_DE_NEVE = 77,
  PANCADAS_DE_CHUVA_FRACAS = 80,
  PANCADAS_DE_CHUVA_MODERADAS = 81,
  PANCADAS_DE_CHUVA_VIOLENTAS = 82,
  PANCADAS_DE_NEVE_FRACAS = 85,
  PANCADAS_DE_NEVE_FORTES = 86,
  TROVOADA_LEVE_OU_MODERADA = 95,
  TROVOADA_COM_GRANIZO_LEVE = 96,
  TROVOADA_COM_GRANIZO_FORTE = 99,
}

export const DescricaoClima: Record<CodigoClimaWMO, string> = {
  [CodigoClimaWMO.CEU_LIMPO]: "Céu limpo",
  [CodigoClimaWMO.PRINCIPALMENTE_LIMPO]: "Principalmente limpo",
  [CodigoClimaWMO.PARCIALMENTE_NUBLADO]: "Parcialmente nublado",
  [CodigoClimaWMO.ENCOBERTO]: "Encoberto",
  [CodigoClimaWMO.NEVOEIRO]: "Nevoeiro",
  [CodigoClimaWMO.NEVOEIRO_COM_SINCELO]: "Nevoeiro com depósito de sincelo",
  [CodigoClimaWMO.CHUVISCO_LEVE]: "Chuvisco leve",
  [CodigoClimaWMO.CHUVISCO_MODERADO]: "Chuvisco moderado",
  [CodigoClimaWMO.CHUVISCO_DENSO]: "Chuvisco denso",
  [CodigoClimaWMO.CHUVISCO_CONGELANTE_LEVE]: "Chuvisco congelante leve",
  [CodigoClimaWMO.CHUVISCO_CONGELANTE_DENSO]: "Chuvisco congelante denso",
  [CodigoClimaWMO.CHUVA_FRACA]: "Chuva fraca",
  [CodigoClimaWMO.CHUVA_MODERADA]: "Chuva moderada",
  [CodigoClimaWMO.CHUVA_FORTE]: "Chuva forte",
  [CodigoClimaWMO.CHUVA_CONGELANTE_LEVE]: "Chuva congelante leve",
  [CodigoClimaWMO.CHUVA_CONGELANTE_FORTE]: "Chuva congelante forte",
  [CodigoClimaWMO.NEVE_FRACA]: "Neve fraca",
  [CodigoClimaWMO.NEVE_MODERADA]: "Neve moderada",
  [CodigoClimaWMO.NEVE_FORTE]: "Neve forte",
  [CodigoClimaWMO.GRAOS_DE_NEVE]: "Grãos de neve",
  [CodigoClimaWMO.PANCADAS_DE_CHUVA_FRACAS]: "Pancadas de chuva fracas",
  [CodigoClimaWMO.PANCADAS_DE_CHUVA_MODERADAS]: "Pancadas de chuva moderadas",
  [CodigoClimaWMO.PANCADAS_DE_CHUVA_VIOLENTAS]: "Pancadas de chuva violentas",
  [CodigoClimaWMO.PANCADAS_DE_NEVE_FRACAS]: "Pancadas de neve fracas",
  [CodigoClimaWMO.PANCADAS_DE_NEVE_FORTES]: "Pancadas de neve fortes",
  [CodigoClimaWMO.TROVOADA_LEVE_OU_MODERADA]: "Trovoada leve ou moderada",
  [CodigoClimaWMO.TROVOADA_COM_GRANIZO_LEVE]: "Trovoada com granizo leve",
  [CodigoClimaWMO.TROVOADA_COM_GRANIZO_FORTE]: "Trovoada com granizo forte",
};

/**
 * Função utilitária opcional para obter o texto de forma segura.
 */
export function obterDescricaoClima(codigo: number): string {
  // Faz um cast do número para o Enum para buscar no objeto
  const descricao = DescricaoClima[codigo as CodigoClimaWMO];
  return descricao || "Condição desconhecida";
}