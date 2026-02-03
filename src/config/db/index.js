const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT } = process.env;
const fs = require("fs");
const { join } = require("path");

const dbConfig = {
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	port: DB_PORT ? Number.parseInt(DB_PORT) : 3306,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
};

if (process.env.NODE_ENV === "production") {
	const path = join(__dirname, "ca.pem");
	dbConfig.ssl = {
		ca: fs.readFileSync(path)
	};
}

const dbInterface = mysql.createPool(dbConfig);

module.exports = dbInterface;
