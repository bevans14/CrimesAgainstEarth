const mysql = require('mysql2');

const config = mysql.createConnection ({
    host: 'localhost',
    user: "root",
    password: "password",
    database: 'carbonEmissionCities',
    port: 3306,
  });

  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  module.exports = config;