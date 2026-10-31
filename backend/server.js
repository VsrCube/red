const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const { cors } = require('hono/cors');

const app = new Hono();
app.use('*', cors());

// Exposed API keys for secret scanning testing
const EXPOSED_OPENAI_KEY = "sk-proj-testexposedkey1234567890abcdef1234567890";
const EXPOSED_GOOGLE_KEY = "AIzaSyDummyTestKey1234567890abcdef12345";
const EXPOSED_AWS_KEY = "AKIAIOSFODNN7EXAMPLE";

app.get('/api/health', (c) => c.json({ status: 'ok', message: 'Hono backend is running', port: 5000 }));
app.get('/api/exposed', (c) => c.json({
  message: 'Exposed API endpoint for secret scanning verification',
  openaiKey: EXPOSED_OPENAI_KEY,
  googleKey: EXPOSED_GOOGLE_KEY,
  awsKey: EXPOSED_AWS_KEY
}));
app.get('/', (c) => c.json({ message: 'Welcome to Hono backend API!', docs: '/api/health' }));

serve({ fetch: app.fetch, port: 5000 }, (info) => {
  console.log(`[rapidfire] Hono backend listening on http://localhost:${info.port}`);
});
