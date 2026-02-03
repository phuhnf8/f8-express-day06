const AuthError = require("@/errors/authError");
const authService = require("@/services/auth.service");
const { JsonWebTokenError } = require("jsonwebtoken");

async function authRequired(req, res, next) {
	if (!req.headers.authorization)
		throw new Error("Authorization header missing");

	if (req.headers.authorization.split(" ").length !== 2)
		throw new Error("Invalid authorization header format");

	const token = req.headers.authorization.split(" ")[1];

	try {
		const result = await authService.validateAccessToken(token);
		if (!result) throw new Error("Invalid token");
		req.user = { id: result.id, email: result.email };

		return next();
	} catch (error) {
		// Leave all to be "Unauthorized" error
		console.log(error.message);
		return next(new AuthError(error.message));
	}
}

module.exports = authRequired;
