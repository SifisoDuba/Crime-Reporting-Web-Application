const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  multipleStatements: true
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ' + err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID ' + connection.threadId);
  
  // Create database and tables
  const setupScript = `
    CREATE DATABASE IF NOT EXISTS crimereportdb;
    USE crimereportdb;
    
    CREATE TABLE IF NOT EXISTS Address (
      HouseNumber INT PRIMARY KEY,
      Street VARCHAR(100),
      Province VARCHAR(50)
    );
    
    CREATE TABLE IF NOT EXISTS User (
      IDNumber VARCHAR(20) PRIMARY KEY,
      FullName VARCHAR(100) NOT NULL,
      Email VARCHAR(100) UNIQUE NOT NULL,
      Password VARCHAR(255) NOT NULL,
      PhoneNumber VARCHAR(11),
      AdditionalNotes TEXT,
      RegistrationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      Picture BLOB,
      HouseNumber INT,
      FOREIGN KEY (HouseNumber) REFERENCES Address(HouseNumber)
    );
    
    CREATE TABLE IF NOT EXISTS Admin (
      AdminIdNumber VARCHAR(20) PRIMARY KEY,
      FullName VARCHAR(100) NOT NULL,
      Email VARCHAR(100) UNIQUE NOT NULL,
      Password VARCHAR(255) NOT NULL,
      PhoneNumber VARCHAR(15),
      Picture BLOB,
      HouseNumber INT,
      FOREIGN KEY (HouseNumber) REFERENCES Address(HouseNumber)
    );
    
    CREATE TABLE IF NOT EXISTS Report (
      ReportId INT PRIMARY KEY AUTO_INCREMENT,
      IncidentType VARCHAR(50) NOT NULL,
      Description TEXT,
      Location VARCHAR(100),
      SeverityLevel VARCHAR(50),
      ResponseTime VARCHAR(50),
      DateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      Anonymous TINYINT(1) DEFAULT 0,
      ReceiveUpdates TINYINT(1) DEFAULT 1,
      Photo BLOB,
      IDNumber VARCHAR(20),
      FOREIGN KEY (IDNumber) REFERENCES User(IDNumber)
    );
    
    CREATE TABLE IF NOT EXISTS Post (
      PostId INT PRIMARY KEY AUTO_INCREMENT,
      Title VARCHAR(100) NOT NULL,
      Author VARCHAR(100),
      Content TEXT,
      Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      AdminIdNumber VARCHAR(20),
      FOREIGN KEY (AdminIdNumber) REFERENCES Admin(AdminIdNumber)
    );
  `;
  
  connection.query(setupScript, (err) => {
    if (err) {
      console.error('❌ Error creating database and tables: ' + err.message);
      return;
    }
    console.log('✅ Database and tables created successfully');
    
    const insertDataScript = `
      -- Insert Addresses with IGNORE to avoid duplicates
      INSERT IGNORE INTO Address (HouseNumber, Street, Province) VALUES
      (42, 'Marine Drive', 'Western Cape'),
      (15, 'Koeberg Road', 'Western Cape'),
      (128, 'Durbanville Road', 'Western Cape'),
      (77, 'Strand Street', 'Western Cape'),
      (23, 'Symphony Way', 'Western Cape');
      
      -- Insert Hope Seja as a user
      INSERT IGNORE INTO User (IDNumber, FullName, Email, Password, PhoneNumber, AdditionalNotes, HouseNumber) VALUES
      ('9202205800085', 'Hope Seja', 'hope@gmail.com', '123456789', '0834567890', 'Community volunteer in neighborhood watch', 42);
      
      -- Insert Matthew Engelbrecht as admin
      INSERT IGNORE INTO Admin (AdminIdNumber, FullName, Email, Password, PhoneNumber, HouseNumber) VALUES
      ('8503155500087', 'Matthew Engelbrecht', 'matthew@crimereport.gov.za', 'Admin@123', '0215551234', 15);
      
      -- Insert sample reports with explicit IDs to avoid duplicates
      INSERT IGNORE INTO Report (ReportId, IncidentType, Description, Location, SeverityLevel, ResponseTime, DateTime, Anonymous, ReceiveUpdates, IDNumber) VALUES
      (1, 'Theft', 'Car broken into and laptop stolen', 'Milnerton Shopping Centre', 'Medium', 'Within 2 hours', '2023-10-15 14:30:00', 0, 1, '9202205800085'),
      (2, 'Vandalism', 'Graffiti on community center walls', 'Milnerton High School', 'Low', 'Within 24 hours', '2023-10-18 09:15:00', 1, 0, '9202205800085'),
      (3, 'Suspicious Activity', 'Unknown persons loitering near electricity substation', 'Koeberg Road near power plant', 'High', 'Immediate', '2023-10-20 22:45:00', 0, 1, '9202205800085');
      
      -- Insert sample community posts with explicit IDs
      INSERT IGNORE INTO Post (PostId, Title, Author, Content, AdminIdNumber) VALUES
      (1, 'Community Meeting This Thursday', 'Matthew Engelbrecht', 'Join us for our monthly community safety meeting at the Milnerton Community Hall. We will be discussing recent incidents and safety initiatives.', '8503155500087'),
      (2, 'Beware of New Scam in Area', 'Matthew Engelbrecht', 'Residents reported individuals posing as municipal workers asking to check water meters. Always ask for official identification.', '8503155500087'),
      (3, 'Neighborhood Watch Program', 'Matthew Engelbrecht', 'We are starting a new neighborhood watch program. Volunteers needed for Tuesday and Thursday evenings.', '8503155500087');
    `;
    
    connection.query(insertDataScript, (err, results) => {
      if (err) {
        console.error('❌ Error inserting data: ' + err.message);
      } else {
        console.log('✅ Sample data inserted successfully (duplicates ignored)');
      }
      
      // Switch to the created database
      connection.changeUser({ database: 'crimereportdb' }, (err) => {
        if (err) {
          console.error('❌ Error switching database: ' + err.message);
          return;
        }
        console.log('📂 Now using database: crimereportdb');
      });
    });
  });
});

module.exports = connection;