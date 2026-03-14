# Hello Node.js

Node.js API - Express, Swagger və Prometheus metrics ilə.

## Endpointlər

| Endpoint | Açıqlama |
|----------|----------|
| `GET /health` | Health check |
| `GET /api/hello?name=World` | Salamlama |
| `GET /api/items` | Item siyahısı |
| `POST /api/items` | Yeni item (body: `{ "name": "..." }`) |
| `GET /api-docs` | Swagger UI |
| `GET /metrics` | Prometheus metrics |

## Lokal işə salma

```bash
npm install
npm start
```

## Docker

```bash
docker build -t hello-nodejs .
docker run -p 3000:3000 hello-nodejs
```

Browser: http://localhost:3000/api-docs
