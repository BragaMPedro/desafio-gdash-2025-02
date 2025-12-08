# Desafio GDASH 2025/02

Este repositório contém a solução para o desafio do processo seletivo GDASH 2025/02. A aplicação consiste em um sistema full-stack para coleta, processamento e visualização de dados climáticos, incluindo uma camada de insights gerados por IA.

## Arquitetura

O sistema é composto pelos seguintes serviços:

- **Frontend:** Uma aplicação em React (Vite) com Tailwind CSS e shadcn/ui para visualização dos dados.
- **API (Backend):** Uma API em NestJS (TypeScript) que gerencia usuários, armazena e expõe os dados climáticos.
- **Collector (Python):** Um serviço que coleta dados de uma API de clima e os envia para uma fila.
- **Queue (Go):** Um worker que consome os dados da fila, os processa e envia para a API.
- **RabbitMQ:** O message broker para a comunicação assíncrona entre o coletor e o worker.
- **MongoDB:** O banco de dados para armazenamento dos dados.

## Configuração do Ambiente

Antes de iniciar a aplicação, é necessário configurar as variáveis de ambiente.

1. Crie um arquivo `.env` na raiz do projeto, copiando o exemplo de `.env.example`:
```bash
cp .env.example .env
```
2. Abra o arquivo `.env` e preencha as seguintes variáveis:

   - `LATITUDE` e `LONGITUDE`: As coordenadas para a coleta de dados climáticos (ex: `-23.5505` e `-46.6333` para São Paulo).
   - `RABBITMQ_DEFAULT_USER` e `RABBITMQ_DEFAULT_PASS`: Credenciais para o RabbitMQ (ex: `user` e `password`).
   - `AMQP_URL`: URL de conexão para o RabbitMQ (ex: `amqp://user:password@rabbitmq:5672/`).
   - `MONGO_INITDB_ROOT_USERNAME` e `MONGO_INITDB_ROOT_PASSWORD`: Credenciais de administrador para o MongoDB (ex: `root` e `password`).
   - `MONGODB_URI`: URL de conexão para o MongoDB (ex: `mongodb://root:password@mongodb:27017/`).
   - `API_PORT`: Porta para a API backend (ex: `3000`).
   - `BACKEND_API_URL`: URL base da API para ser usada pelos serviços (ex: `http://api:3000`).
   - `VITE_BACKEND_API_URL`: URL completa da API para ser usada pelo frontend, este padrão é específico do Vite (ex: `http://api:3000`).
   - `FRONTEND_URL`: Está URL será usada para configurações de CORS no backend. Deve ser a mesma que seu frontend usará, normalmente `http://frontend:5173`
   - `ADMIN_EMAIL` e `ADMIN_PASSWORD`: Credenciais para o usuário administrador padrão que será criado na inicialização (ex: `admin@example.com` e `password123`). Está etapa é muito importante para o funcionamento correto do sistema e acesso do usuário.


*Note que nesta configuração, ao invés de `localhost`, para que os serviços se comuniquem entre si são usados os nome dos próprios. Para acesso ver seção [URLs Principais](#urls-principais)

## Como Rodar a Aplicação

### Com Docker Compose (Recomendado)

A forma mais simples de executar toda a aplicação é utilizando o Docker Compose.

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Configure o arquivo `.env` conforme as instruções acima.
3. Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build -d
```
Isso irá construir as imagens e iniciar todos os serviços em segundo plano.

### Executando Serviços Individualmente

## URLs Principais

Após iniciar a aplicação com o Docker Compose, os serviços estarão disponíveis nos seguintes endereços:

- **Frontend (Dashboard):** [http://localhost:5173](http://localhost:5173)
- **API (Backend):** [http://localhost:3000](http://localhost:3000) (ou a porta que você definiu em `API_PORT`)
- **RabbitMQ Management:** [http://localhost:15672](http://localhost:15672) (está é a URL da interface gráfica do RabbitMQ)

## Usuário Padrão

Para o primeiro acesso ao sistema, utilize as credenciais de administrador que você definiu nas variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` no seu arquivo `.env`.
