const AuthError = require("@/errors/authError");
const DbError = require("@/errors/dbError");
const InputError = require("@/errors/inputError");
const userModel = require("@/models/user.model");
const tokenService = require("@/services/token.service");
const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const revokedTokenModel = require("@/models/revokedToken.model");

class AuthService {
	constructor() {
		this.passwordSaltRounds = 10;
	}

	async encryptPassword(password) {
		const salt = await bcrypt.genSalt(this.passwordSaltRounds);
		return await bcrypt.hash(password, salt);
	}
	async comparePassword(rawPassword, hashedPassword) {
		return await bcrypt.compare(rawPassword, hashedPassword);
	}

	async registerUser(registerData) {
		// May include additional logic such as hashing the password
		const { username, email, password: rawPassword } = registerData;

		// Simple validation

		// Create additional data
		const insertId = crypto.randomUUID();
		const hashedPassword = await this.encryptPassword(rawPassword);

		// Rendered new account data
		const validRegisterData = {
			id: insertId,
			username,
			email,
			password: hashedPassword
		};
		try {
			await userModel.createUser(validRegisterData);
			const newTokens = await tokenService.generateToken(insertId);
			return newTokens;
		} catch (error) {
			throw new DbError("Failed to register user", error.errno ?? 500);
		}
	}

	async loginUser(email, password) {
		// Authenticate user
		const userData = await userModel.findUserByEmail(email);
		if (!userData) {
			throw new AuthError("Invalid email or password");
		}
		const isPasswordValid = await this.comparePassword(
			password,
			userData.password
		);
		if (!isPasswordValid) {
			throw new AuthError("Invalid email or password");
		}
		// Generate new tokens
		const newToken = await tokenService.generateToken(userData.id);
		return { ...newToken, id: userData.id };
	}

	async refreshToken(requestPayload) {
		const { access_token, refresh_token } = requestPayload;
		// Get user ID from access token.
		const id = tokenService.getRawPayload(access_token).sub;

		// Validate the old refresh token with user ID
		const isValidUser = await userModel.checkValidRefreshToken(
			id,
			refresh_token
		);
		if (!isValidUser) {
			throw new AuthError("Invalid refresh token");
		}

		// Generate new tokens
		const newTokens = await tokenService.generateToken(id);
		return newTokens;
	}

	async logoutUser(userId, access_token) {
		// Invalidate the refresh token in the database
		await userModel.updateRefreshToken(userId, "", new Date());
		// Push the access token to a blacklist
		await tokenService.blacklistAccessToken(userId, access_token);
	}

	// This simply return true or false, not handling errors here. Because, in default, message'd be "Unauthorized" for any token error.
	async validateAccessToken(token) {
		try {
			const { isValid, userId, exp } =
				tokenService.verifyAccessToken(token);
			if (isValid) {
				// Check TTL
				if (Date.now() >= exp) return false;
				console.log(new Date(exp).toTimeString());
				// Check existence of user in DB
				const userData = await userModel.findUserById(userId);
				if (!userData) return false;

				// Check if token is revoked
				const isRevoked = await revokedTokenModel.isTokenRevoked(token);

				if (isRevoked) {
					return false;
				}

				const { email } = userData;
				return {
					email,
					id: userId,
					access_token: token
				};
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
}
module.exports = new AuthService();
