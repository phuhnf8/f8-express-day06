const DbError = require("@/errors/dbError");
const authService = require("@/services/auth.service");

function renderLoginInfo(access_token, refresh_token, id, email) {
	return {
		user: {
			email,
			id: id
		},
		access_token: access_token,
		refresh_token: refresh_token
	};
}
class AuthController {
	constructor() {}

	// POST /auth/register
	async register(req, res, next) {
		try {
			const { access_token, refresh_token, id } =
				await authService.registerUser(req.body);
			return res.success(
				renderLoginInfo(access_token, refresh_token, id, req.body.email)
			);
		} catch (error) {
			throw next(error);
		}
	}

	// POST /auth/login
	async login(req, res, next) {
		// In case the client request login while already having a token
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			const validated = await authService.validateAccessToken(token);
			if (validated) {
				const { email, id, access_token } = validated;

				const renderData = renderLoginInfo(
					access_token,
					undefined,
					id,
					email
				);
				return res.success({
					message: "User already logged in",
					...renderData
				});
			}
		}

		//  In case no auth header or invalid token, proceed to login
		try {
			const { email, password } = req.body;
			const { access_token, refresh_token, id } =
				await authService.loginUser(email, password);
			return res.success(
				renderLoginInfo(access_token, refresh_token, id, email)
			);
		} catch (error) {
			return next(error);
		}
	}

	// POST /auth/refresh-token
	async refreshToken(req, res, next) {
		try {
			const { access_token, refresh_token } =
				await authService.refreshToken(req.body);
			return res.success({
				access_token,
				refresh_token
			});
		} catch (error) {
			return next(error);
		}
	}

	// POST /auth/logout
	async logout(req, res, next) {
		// Get access token from header
		const access_token = req.headers.authorization.split(" ")[1];
		try {
			await authService.logoutUser(req.user.id, access_token);
			return res.success({ message: "Logout successful" });
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new AuthController();
