const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const WORKER_URL = process.env.WORKER_URL || 'http://worker:5000';

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend', timestamp: new Date().toISOString() });
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`${WORKER_URL}/process`);
    res.json({
      message: 'Data from backend service',
      workerResponse: response.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Worker service error:', error.message);
    res.status(503).json({
      error: 'Worker service unavailable',
      message: 'Unable to reach worker service'
    });
  }
});

app.post('/api/process', async (req, res) => {
  try {
    const response = await axios.post(`${WORKER_URL}/process`, req.body);
    res.json({
      message: 'Data processed successfully',
      result: response.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Worker processing error:', error.message);
    res.status(503).json({
      error: 'Processing failed',
      message: 'Unable to process data through worker service'
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    service: 'Docker Flow Backend',
    version: '1.1.0',
    author: 'Harsh Pardhi',
    endpoints: {
      health: '/health',
      getData: '/api/data',
      processData: '/api/process'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend service running on port ${PORT}`);
});
