# PGR305-exam

## OPS:

- need to run `npm install or yarn` in forontend
- need to set the ConnectionString in appsettings.json file in api

### ports:

- frontend https://localhost:3000
- server https://localhost:5001/swager

## run the solusion

#### Development (from base folder)

- Run both server and frontend `cd frontend && npm run dev:all`
- Run frontend `cd frontend && npm run dev`
- run server `dotnet watch run --project .\api`

#### Production (from base folder)

- build and run both server and frontend `cd frontend && npm start`
- build and run frontend `cd frontend && npm run build && npm run serve`
- publish server `dotnet publish .\api && cd .\api\bin\Debug\net5.0\publish &&dotnet api.dll`
