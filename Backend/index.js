
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); 
const db = require('./database'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-super-secret-key-for-jwt'; 


app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server running and ready at http://localhost:${PORT}`);
});


// REGISTER REQUEST
let reports = [];

// LOGIN REQUEST
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', req.body);

  if (!email || !password) {
    return res.status(400).json({ errors: ['Please fill in both fields.'] });
  }

  const validUser = {
    email: "test@gmail.com",
    password: "password123"
  };

  if (email === validUser.email && password === validUser.password) {
    // Generate JWT token for user
    const token = jwt.sign(
      { email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ 
      message: 'Login successful!',
      token,
      user: { email }
    });
  } else {
    return res.status(401).json({ errors: ['Invalid email or password.'] });
  }
});

// REPORT SUBMISSION WITH USER INFO
app.post('/report', (req, res) => {
  try {
    const { incidentType, description, location, severity, dateTime, anonymous, followUp, responseTime, userEmail } = req.body;
    console.log('Received new report data:', req.body);

    if (!incidentType || !description || !location || !dateTime || !severity || !responseTime) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    const newReport = {
      id: newId,
      incidentType,
      description,
      location,
      severity,
      dateTime,
      anonymous,
      followUp,
      responseTime,
      userEmail: userEmail || 'anonymous',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    reports.push(newReport);

    res.status(201).json({
      message: 'Report submitted successfully!',
      reportId: `RPT-${newId}-${Date.now()}`
    });
  } catch (err) {
    console.error("Server crash in /report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/update-personal-details', (req, res) => {
  const { name, email, number, password, confirmPassword } = req.body;
  console.log('Received personal details update:', req.body);

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
    }

  if (!/^0\d{9}$/.test(number)) {
      return res.status(400).json({ error: 'Phone number must be 10 digits.' });
    }

  res.status(201).json({
    message: 'Personal details updated successfully!',
    user: {
      name,
      email,
      number
    }
  });
});


app.post('/address', (req, res) => {  
  const { street, city, house, postalCode } = req.body;
  console.log('Received address data:', req.body);

  res.status(201).json({
    message: 'Address updated successfully!',
    address: {
      street,
      city,
      house,
      postalCode
    }
  });
});


// GET ALL REPORTS
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// GET USER-SPECIFIC REPORTS
app.get('/api/user-reports', (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required' });
  }
  
  const userReports = reports.filter(report => report.userEmail === email);
  res.json(userReports);
});

// UPDATE REPORT STATUS
app.patch('/api/reports/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let updatedReport = null;
  reports = reports.map(report => {
    if (report.id === parseInt(id)) {
      updatedReport = { ...report, status };
      return updatedReport;
    }
    return report;
  });

  if (updatedReport) {
    res.json({ message: 'Status updated', report: updatedReport });
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
});

// ARCHIVE (DELETE) A REPORT
app.post('/api/reports/:id/archive', (req, res) => {
  const { id } = req.params;
  const initialLength = reports.length;
 
  reports = reports.filter(report => report.id !== parseInt(id));

  if (reports.length < initialLength) {
    res.json({ message: 'Report archived' });
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
});



// UPLOAD POST REQUEST
app.post('/upload-post', (req, res) => {
  const { title, content, author, timestamp } = req.body;
  console.log('Received post data:', req.body);

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }
  return res.status(201).json({
    message: 'Post uploaded successfully ',
    post: { title, content, author, timestamp }
  });
});


// ADMIN LOGIN REQUEST
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received admin login data:', req.body);
  
  if (!username || !password) {
    return res.status(400).json({ errors: ['Please fill in both fields.'] });
  }
  
  const validAdmin = {
    username: 'admin',
    password: 'admin123'
  };

  if (username !== validAdmin.username || password !== validAdmin.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  
  const token = jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

