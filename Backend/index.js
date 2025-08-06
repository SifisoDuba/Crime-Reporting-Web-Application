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