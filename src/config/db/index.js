const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT } = process.env;
const dbInterface = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	port: DB_PORT ? Number.parseInt(DB_PORT) : 3306,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});

module.exports = dbInterface;
