const AuthError = require("@/errors/authError");
const DbError = require("@/errors/dbError");
const InputError = require("@/errors/inputError");

function exceptionHandler(err, req, res, next) {
	let statusCode = err.status || 500;

	if (err instanceof AuthError) {
		statusCode = 401;
		console.log("Unauthorized access attempt:", err.message);
		return res.error(statusCode, "Unauthorized");
	} else if (err instanceof InputError) {
		return res.error(statusCode, err.message);
	} else if (err instanceof ReferenceError) {
		console.error("Reference error:", err.message, err.stack);
		return res.error(statusCode, "Internal Server Error");
	} else if (err instanceof DbError) {
		console.log("Database error:", err.message, err.stack);
		if (err.isConnectionError()) {
			statusCode = 503;
		} else {
			statusCode = 422;
		}
		return res.error(statusCode, err.shortMessage);
	} else if (err instanceof SyntaxError) {
		statusCode = 400;
		console.log("Bad syntax", err.stack);

		return res.error(statusCode, "Syntax Error");
	}

	console.error("Unhandled error:", err.message, err.stack);
	return res.error(500, "Internal Server Error", err);
}

module.exports = exceptionHandler;
