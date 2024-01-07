const mysql = require('mysql2');


const connection = mysql.createPool({
  host: 'crimesagainstearth1.c7g842qe6h75.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'crimesAgainstEarth'
})

connection.getConnection((err, connection) => {
  if (err) {
      console.log('Error connecting to the database:', err);
      return;
  } 
  console.log('Connection successful!')
  connection.release();
})

module.exports = connection;

