const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

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

//REGISTER REQUEST
app.post('/register', (req, res) => {
  const { fullName, idNumber, email, password, confirmPassword, phone, address, city, houseNumber, province, notes, timestamp } = req.body;
  console.log('Received registration data:', req.body);

  const errors = [];

  if (!fullName || !idNumber || !email || !password || !confirmPassword || !phone || !address || !city || !houseNumber || !province) {
    errors.push('Please fill in all required fields.');
  }

  if (!/^\d{13}$/.test(idNumber)) {
    errors.push('ID number must be exactly 13 digits.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format.');
  }

  if (password !== confirmPassword) {
    errors.push('Password and Confirm Password do not match.');
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (!/^0\d{9}$/.test(phone)) {
    errors.push('Phone number must be 10 digits and start with 0.');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return res.status(200).json({
    message: 'Validation passed ✅',
    user: {
      fullName,
    }
  });
});

//LOGIN REQUEST
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', req.body);

  const errors = [];

  if (!email || !password) {
    errors.push('Please fill in both fields.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const validUser = {
    email: "test@gmail.com",
   password: "password123"
  };  
});

//UPLOAD POST REQUEST
app.post('/upload-post', (req, res) => {
  const { title, content, author, timestamp } = req.body;
  console.log('Received post data:', req.body);

  if (!title || !content || !author) {
    return res.status(400).json('Please fill in all fields.');
  }
  return res.status(200).json({
    message: 'Post uploaded successfully ✅',
    post: {
      title,
      content,
      author,
      timestamp
    }
  });
});

// ADMIN LOGIN REQUEST
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login data:', req.body);
  const errors = [];
  // Validate input
  if (!username || !password) {
    errors.push('Please fill in both fields.');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const validAdmin = {
    username: 'admin',
    password: 'admin123'
  };
  // Check credentials
  if (username !== validAdmin.username || password !== validAdmin.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Generate JWT token
  const token = jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

//REPORTS REQUEST
let reports = [
  {
    id:1,
    title: 'Murder',
     description: 'I found Elmo stabbed with multiple biscuit holes',
    date: '2023-11-15 14:30',
    status: 'Active',
    author: 'Cookie Monster',
    authorities: 'Police',
    location: '125 Sesame Street'
  },
  { 
            id: 2,
            title: 'Kidnapping',
            description: 'The vice president Joe Biden took my child',
            date: '2023-11-14 09:15',
            status: 'Investigating',
            author: 'Obama',
            authorities: 'Ambulance',
            location: 'Area 51'
          },
          { 
            id: 3,
            title: 'Break In',
            description: 'My biggest fan Kanye broke in the White House',
            date: '2023-11-13 03:45',
            status: 'Pending',
            author: 'Donald .T Duck',
            authorities: 'Fire Department',
            location: 'White House, Washington D.C.'
          }
];

app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.patch('/api/reports/:id/status', (req, res) =>{
  const {id} = req.params;
  const {status} = req.body;

  reports = reports.map(report =>
    report.id === parseInt(id) ? {...report, status } : report
  );

  res.json({message: 'Status updated', report: reports.find(r => r.id === parseInt(id))} );
});

app.post('/api/reports/:id/archive', (req, res) => {
  const { id } = req.params;
  // In a real app, you'd move this to an archive collection
  reports = reports.filter(report => report.id !== parseInt(id));
  res.json({ message: 'Report archived' });
});