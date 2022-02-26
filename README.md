# CoderHouse Clase 8  - SQL

## Set environment variables

rename `.env.example` to `.env` a set the variables
(is necessary create your own database)

````
APP_ENV=development
APP_URL=http://localhost
APP_PORT=8080

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
````

## Dependencies install
````
npm install
````

## Migrations

### Create table

````
npm run migration
````

### Populate table

````
npm run seed
````

## How to run

````
npm run dev
````

