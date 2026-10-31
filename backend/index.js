const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const { cors } = require('hono/cors');

const app = new Hono();
app.use('*', cors());

app.get('/api/health', (c) => c.json({ status: 'ok', message: 'Hono backend is running', port: 5000 }));
app.get('/', (c) => c.json({ message: 'Welcome to Hono backend API!', docs: '/api/health' }));

serve({ fetch: app.fetch, port: 5000 }, (info) => {
  console.log(`[rapidfire] Hono backend listening on http://localhost:${info.port}`);
});
