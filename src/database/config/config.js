require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "bfgstore",
    "host": "127.0.0.1",
    "port": "3306",//"8889"
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
