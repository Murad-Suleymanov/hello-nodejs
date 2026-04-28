const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { metricsHandler } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://hello-python-svc.hello-python.svc.cluster.local:8080';

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ message: `Hello, ${name}!` });
});

app.get('/api/items', (req, res) => {
  res.json({
    items: [
      { id: 1, name: 'Item One' },
      { id: 2, name: 'Item Two' },
    ],
  });
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  res.status(201).json({ id: Date.now(), name });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// OpenAPI JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Chain: hello-nodejs → hello-python
app.get('/api/chain', async (req, res) => {
  let pythonResponse;
  console.log(`[chain] calling hello-python: ${PYTHON_SERVICE_URL}/`);
  try {
    const r = await fetch(`${PYTHON_SERVICE_URL}/`);
    pythonResponse = await r.json();
    console.log('[chain] hello-python response ok');
  } catch (err) {
    console.error(`[chain] hello-python unreachable: ${err.message}`);
    pythonResponse = 'unreachable';
  }
  res.json({
    source: 'hello-nodejs',
    calledService: {
      service: 'hello-python',
      response: pythonResponse,
    },
  });
});

// Prometheus metrics
app.get('/metrics', metricsHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  console.log(`Metrics: http://localhost:${PORT}/metrics`);
});
