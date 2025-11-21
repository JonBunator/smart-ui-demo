# Survey application for master's thesis of Jonas Bühler

<img src="/doc-images/application-screenshot-bookings.png"/>
<img src="/doc-images/application-screenshot-properties.png.png"/>

## Production environment
Create `.env` in root
```
OPENAI_API_KEY=
OPENAI_ENDPOINT=
OPENAI_API_VERSION=2025-01-01-preview
OPENAI_DEPLOYMENT= # You can only use GPT-4.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=debug123
DATABASE_URL="postgresql://postgres:debug123@database:5432/postgres?schema=public"
JWT_SECRET=DEBUG_SECRET
```

Start docker container
```
docker compose up --build
```

Seed database
```
cd src
npm install
npm run init-db
npm run seed
```

## Local development
Build `smart-ui` library
```
cd smart-ui
npm install
npm run build
npm link
```

Create `.env.development` in root
```
OPENAI_API_KEY=
OPENAI_ENDPOINT=
OPENAI_API_VERSION=2025-01-01-preview
OPENAI_DEPLOYMENT= # You can only use GPT-4.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=debug123
DATABASE_URL="postgresql://postgres:debug123@localhost:5432/postgres?schema=public"
JWT_SECRET=DEBUG_SECRET
```

Run main application
```
cd ..
cd src
npm install
npm link smart-ui
npm run dev
```

Start database
```
docker compose up database
```

Seed database (only once)
```
npm run init-db
npm run seed
```
