const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API route example
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// Serve Vue static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback to index.html for SPA routing
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
