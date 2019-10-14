const mysql = require('mysql2/promise');
const config = require('../config/envConfig.json');
const environment = process.env.NODE_ENV || 'development';
const databaseConfig = config[environment].database;

module.exports = {
    connection: async () => {
        const db = await mysql.createConnection({ host: databaseConfig.host, port: databaseConfig.port, user: databaseConfig.user, password: databaseConfig.password, database: databaseConfig.database });
        return db;
    }
}
