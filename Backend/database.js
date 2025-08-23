const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crimereportdb',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ' + err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID ' + connection.threadId);
});

// Step 3: Create database if not exists
  connection.query(`CREATE DATABASE IF NOT EXISTS crimereportdb`, (err) => {
    if (err) throw err;
    console.log("📦 Database checked/created");

    // Step 4: Switch to the database
    connection.changeUser({ database: 'crimereportdb' }, (err) => {
      if (err) throw err;
      console.log("📂 Now using database: crimereportdb");

      // Step 5: Create tables if they don’t exist
      const createTables = `
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
          Number VARCHAR(20),
          PhoneNumber VARCHAR(15),
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

      connection.query(createTables, (err) => {
        if (err) throw err;
        console.log("🛠️ Tables checked/created");
      });
    });
  });

module.exports = connection;
