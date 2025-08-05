const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.post('/register', (req, res) => {
  const { fullName, idNumber, email, password, phone, address, city, houseNumber, province, notes, timestamp  } = req.body;
  console.log('Received registration data:', req.body);


   if (!fullName || !idNumber || !email || !password || !phone || !address || !city || !houseNumber || !province) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  return res.status(200).json({
    message: 'Validation passed ✅',
    user: {
      fullName,

    }
  });
});