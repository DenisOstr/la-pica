# La Pica

Fullstack application (REST API) for create and manage pizzas

## Development stack
### Backend

- NestJS
- Prisma
- PostgreSQL
- Swagger
- TypeScript

### Frontend

- VueJS
- CompositionAPI
- Pinia
- Vue Router
- Axios
- TailwindCSS
- TypeScript

## Installation

Clone application repository
```bash
git clone https://github.com/DenisOstr/la-pica
```

### Backend

Go to backend folder

Run to install dependencies
```bash
npm install
```

Create postgres database  
Create `.env` file from `.env.example`  
Change `username`, `password` and `dbname` in DATABASE environment variable

Make migration to Prisma
```bash
npx prisma migrate dev --name "init"
```

Run backend application
```bash
npm run start
```
or
```bash
npm run start:dev
```

### Frontend

Go to frontend folder

Run to install dependencies
```bash
npm install
```

Run frontend application
```bash
npm run dev
```