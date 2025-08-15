
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); 

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-super-secret-key-for-jwt'; 


app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true
}));
app.use(express.json()); 


// REGISTER REQUEST
app.post('/register', (req, res) => {
  const { fullName, idNumber, email, password, confirmPassword, phone, address, city, houseNumber, province } = req.body;
  console.log('Received registration data:', req.body);

  const errors = [];

  if (!fullName || !idNumber || !email || !password || !confirmPassword || !phone || !address || !city || !houseNumber || !province) {
    errors.push('Please fill in all required fields.');
  }
  if (password !== confirmPassword) {
    errors.push('Password and Confirm Password do not match.');
  }
 
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return res.status(201).json({
    message: 'Registration successful! ',
    user: { fullName, email }
  });
});

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
    return res.status(200).json({ message: 'Login successful! ' });
  } else {
    return res.status(401).json({ errors: ['Invalid email or password.'] });
  }
});


let reports = [
  { id: 1, incidentType: 'Theft', description: 'Cookie jar was stolen from the kitchen.', location: '123 Sesame Street', severity: 'High', dateTime: '2025-08-14T10:00', anonymous: false, followUp: true },
  { id: 2, incidentType: 'Vandalism', description: 'Graffiti on the park bench.', location: 'Central Park', severity: 'Medium', dateTime: '2025-08-13T22:15', anonymous: true, followUp: false },
];


app.post('/api/reports', (req, res) => {
  console.log('Received new report data:', req.body);
  const { incidentType, description, location, severity, dateTime, anonymous, followUp } = req.body;

  // Basic validation
  if (!incidentType || !description || !location) {
    return res.status(400).json({ message: 'Missing required fields: incidentType, description, and location are required.' });
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
    followUp
  };
  reports.push(newReport);


  res.status(201).json({
    message: 'Report submitted successfully!',
    reportId: `RPT-${newId}-${Date.now()}`
  });
});


// GET ALL REPORTS
app.get('/api/reports', (req, res) => {
  res.json(reports);
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

app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server running and ready at http://localhost:${PORT}`);
});
