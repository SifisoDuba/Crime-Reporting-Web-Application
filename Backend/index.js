const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const connection = require('./database');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-super-secret-key-for-jwt';


app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Server running and ready at http://localhost:${PORT}`);
});


app.post('/register', (req, res) => {
  const { fullName, idNumber, email, password, confirmPassword, phone, address, city, houseNumber, province, notes } = req.body;
  console.log('Received registration data:', req.body);
  registrationTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (!fullName || !idNumber || !email || !password || !confirmPassword || !phone || !address || !city || !houseNumber || !province) {
    return res.status(400).json({ errors: ['Please fill in all fields.'] });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ errors: ['Passwords do not match.'] });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ errors: ['Invalid email format.'] });
  }
  if (!/^0\d{9}$/.test(phone)) {
    return res.status(400).json({ errors: ['Phone number must be 10 digits.'] });
  }
  if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password) === false) {
    return res.status(400).json({ errors: ['Password must be at least 8 characters long with at least 1 Uppercase and Lowecase letter and 1 numeric value '] });
  }
  if (/^\d{13}$/.test(idNumber) === false) {
    return res.status(400).json({ errors: ['ID Number must be 13 digits.'] });
  }

  connection.query(
    'INSERT INTO address (HouseNumber, Street, City, Province) VALUES (?, ?, ?, ?)',
    [houseNumber, address, city, province],
    (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ errors: ['Server error. Please try again later.'] });
      }
      console.log('Address inserted/exists:', address);
    }
  );
  connection.query(
    'INSERT INTO user (IDNumber, FullName, Email, Password, PhoneNumber, AdditionalNotes, HouseNumber) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [idNumber, fullName, email, password, phone, notes || null, houseNumber],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ errors: ['Email or ID Number already registered.'] });
        }
        return res.status(500).json({ errors: ['Server error. Please try again later.'] });
      }
      console.log('User registered:', email);
      return res.status(201).json({
        message: 'Registration successful! You can now log in.'
      });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', req.body);
  connection.query(
    'SELECT * FROM user WHERE Email = ? AND Password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        console.log('No user found with provided credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      idNumber = user.IDNumber;
      console.log(`User logged in: ${email}, ID Number: ${idNumber}`);

      return res.status(200).json({
        message: 'Login successful!',
        idNumber: idNumber,
      });
    }
  );
});


app.post('/report', upload.single('photo'), (req, res) => {
  try {
    const { incidentType, description, location, severity, dateTime, anonymous, followUp, responseTime, userId } = req.body;
    const photoBuffer = req.file ? req.file.buffer : null;
    const isAnonymous = anonymous === 'true' || anonymous === true;
    console.log('Received new report data:', req.body);

    if (!incidentType || !description || !location || !dateTime || !severity || !responseTime) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    if (!isAnonymous && !userId) {
      return res.status(400).json({ message: 'User ID is required for non-anonymous reports.' });
    }

    const idNumber = isAnonymous ? null : userId;

    connection.query(
      'INSERT INTO Report (IncidentType, Description, Location, SeverityLevel, ResponseTime, DateTime, Anonymous, ReceiveUpdates, Photo, IDNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [incidentType, description, location, severity, responseTime, dateTime, isAnonymous ? 1 : 0, followUp ? 1 : 0, photoBuffer, idNumber],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Server error. Please try again later.' });
        }
        console.log('Report inserted:', results.insertId);
        res.status(201).json({
          message: 'Report submitted successfully!',
          reportId: results.insertId
        });
      }
    );
  } catch (err) {
    console.error("Server crash in /report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/reports', (req, res) => {
  connection.query(
    `SELECT ReportId, IncidentType, Description, Location, SeverityLevel, 
            ResponseTime, DateTime, Anonymous, ReceiveUpdates, Status, IDNumber 
     FROM Report`,
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      res.json(results);
      console.log(results);
    }
  );
});


app.post('/update-personal-details', (req, res) => {
  const { name, email, number, password, confirmPassword, idNumber } = req.body;
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

  connection.query(
    'UPDATE user SET FullName = ?, Email = ?, PhoneNumber = ?, Password = ? WHERE IDNumber = ?',
    [name, email, number, password, idNumber],
    (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      console.log('Personal details updated for ID Number:', idNumber);
    }
  );

  res.status(201).json({
    message: 'Personal details updated successfully!',
    user: {
      name,
      email,
      number
    }
  });
});

app.post('/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
  const { idNumber } = req.body;
  const fileBuffer = req.file.buffer;

  if (!idNumber || !fileBuffer) {
    return res.status(400).json({ error: "Missing file or user ID." });
  }

  connection.query(
    'UPDATE user SET Picture = ? WHERE IDNumber = ?',
    [fileBuffer, idNumber],
    (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error." });
      }
      res.json({ message: "Profile picture updated successfully." });
    }
  );
});

app.get('/user-profile-picture/:idNumber', (req, res) => {
  const idNumber = req.params.idNumber;
  connection.query(
    'SELECT Picture FROM user WHERE IDNumber = ?',
    [idNumber],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }
      if (results.length === 0 || !results[0].Picture) {
        return res.status(404).send("No profile picture found");
      }
      const picture = results[0].Picture;
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(picture);
    }
  );
});


app.get('/user/:idNumber', (req, res) => {
  const { idNumber } = req.params;

  connection.query(
    'SELECT FullName, Email, PhoneNumber, Password FROM user WHERE IDNumber = ?',
    [idNumber],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(results[0]);
    }
  );
});


app.get('/address/:idNumber', (req, res) => {
  const { idNumber } = req.params;

  connection.query(
    'SELECT a.Street, a.City, a.Province, u.HouseNumber FROM user u JOIN address a ON u.HouseNumber = a.HouseNumber WHERE u.IDNumber = ?',
    [idNumber],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Address not found.' });
      }
      res.json(results[0]);
    }
  );
});


app.post('/update-address', (req, res) => {
  const { street, house, city, province } = req.body;
  console.log('Received address update:', req.body);

  connection.query(
    'UPDATE address SET Street = ?, City = ?, Province = ? WHERE HouseNumber = ?',
    [street, city, province, house],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      console.log('Address updated for House Number:', house);
      res.status(201).json({
        message: 'Address updated successfully!'
      });
    }
  );
});


app.get('/api/reports', (req, res) => {
  connection.query('SELECT r.ReportId, r.IncidentType, r.Description, r.Location, r.SeverityLevel, r.ResponseTime, r.DateTime, r.Anonymous, r.ReceiveUpdates, r.Status, r.IDNumber, r.isArchived, CASE WHEN r.Photo IS NOT NULL THEN 1 ELSE 0 END as HasPhoto, u.FullName FROM Report r LEFT JOIN user u ON r.IDNumber = u.IDNumber WHERE r.isArchived = 0 ORDER BY r.DateTime DESC', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    res.json(results);
  });
});

app.get('/api/user-reports', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required' });
  }

  // First, get the IDNumber from User table using email
  connection.query('SELECT IDNumber FROM User WHERE Email = ?', [email], (err, userResults) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const idNumber = userResults[0].IDNumber;

    // Then, get reports using the IDNumber
    connection.query('SELECT * FROM Report WHERE IDNumber = ? ORDER BY DateTime DESC', [idNumber], (err, reportResults) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
      res.json(reportResults);
    });
  });
});

app.patch('/api/reports/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  connection.query('UPDATE Report SET Status = ? WHERE ReportId = ?', [status, id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Status updated' });
  });
});

app.post('/api/reports/:id/archive', (req, res) => {
  const { id } = req.params;

  connection.query('UPDATE Report SET isArchived = 1 WHERE ReportId = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report archived successfully' });
  });
});

app.get('/api/reports/archived', (req, res) => {
  connection.query('SELECT r.ReportId, r.IncidentType, r.Description, r.Location, r.SeverityLevel, r.ResponseTime, r.DateTime, r.Anonymous, r.ReceiveUpdates, r.Status, r.IDNumber, r.isArchived, CASE WHEN r.Photo IS NOT NULL THEN 1 ELSE 0 END as HasPhoto, u.FullName FROM Report r LEFT JOIN user u ON r.IDNumber = u.IDNumber WHERE r.isArchived = 1 ORDER BY r.DateTime DESC', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    res.json(results);
  });
});

app.get('/api/reports/:id/photo', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT Photo FROM Report WHERE ReportId = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    if (results.length === 0 || !results[0].Photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    const photo = results[0].Photo;
    res.setHeader('Content-Type', 'image/jpeg'); // Assuming JPEG, adjust if needed
    res.send(photo);
  });
});



app.post('/upload-post', (req, res) => {
  const { title, content, author, timestamp } = req.body;
  console.log('Received post data:', req.body);

  connection.query(
    'INSERT INTO Post (Title, Author, Content, AdminIdNumber) VALUES (?, ?, ?, ?)',
    [title, author, content, '8503155500087'],
    (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ errors: ['Server error. Please try again later.'] });
      }
      console.log('Post uploaded:', title);
    }
  );
});

app.get('/posts', (req, res) => {
  connection.query(
    'SELECT PostId, Title, Author, Content, Timestamp FROM Post ORDER BY Timestamp DESC',
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }
      res.json(results);
    }
  );
});


app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received admin login data:', req.body);

  if (!username || !password) {
    return res.status(400).json({ errors: ['Please fill in both fields.'] });
  }

  connection.query(
    'SELECT * FROM admin WHERE Email = ? AND Password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        console.log('No admin found with provided credentials');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const admin = results[0];
      console.log(`Admin logged in: ${username}`);

      return res.status(200).json({
        message: 'Login successful!',
        adminId: admin.AdminIdNumber
      });
    }
  );
});




app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  connection.query('UPDATE Post SET Title = ?, Content = ?, Author = ? WHERE PostId = ?', [title, content, author, id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ errors: ['Server error. Please try again later.'] });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully' });
  });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM Post WHERE PostId = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ errors: ['Server error. Please try again later.'] });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
});



app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
