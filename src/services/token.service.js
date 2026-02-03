const { jwt, jwtOptions } = require("@/config/jwt");
const revokedTokenModel = require("@/models/revokedToken.model");
const userModel = require("@/models/user.model");
const { string } = require("@/utils/string");

// Service to handle token generation purely. Not for verification in requests.
class TokenService {
	constructor(options) {
		// TTLs are in seconds
		this.secretKey = options.secret_key;
		this.ttl = options.ttl;
		this.refresh_ttl = options.refresh_ttl;
		this.header = {
			alg: "HS256",
			typ: "JWT"
		};
	}

	generateAccessToken(userId) {
		// Logic to generate JWT token using this.secretKey and this.ttl
		const payload = {
			sub: userId,
			exp: Date.now() + this.ttl * 1000
		};
		return {
			token: jwt.sign(payload, this.secretKey)
		};
	}

	getRawPayload(token) {
		const decoded = jwt.verify(token, this.secretKey);
		return decoded.payload;
	}

	verifyAccessToken(token) {
		// Logic to verify JWT token using this.secretKey
		try {
			const decoded = jwt.verify(token, this.secretKey);
			return {
				isValid: decoded.bool,
				userId: decoded.payload.sub,
				exp: decoded.payload.exp
			};
		} catch (error) {
			return {
				isValid: false,
				userId: null
			};
		}
	}

	async generateRefreshToken(userID) {
		const refresh_token = string.random(32);
		const refresh_ttl = new Date(Date.now() + this.refresh_ttl * 1000);
		await userModel.updateRefreshToken(userID, refresh_token, refresh_ttl);
		return {
			token: refresh_token
		};
	}

	async generateToken(userId) {
		const accessToken = this.generateAccessToken(userId);
		const refreshToken = await this.generateRefreshToken(userId);
		return {
			id: userId,
			access_token: accessToken.token,
			refresh_token: refreshToken.token
		};
	}

	async blacklistAccessToken(userId, accessToken) {
		await revokedTokenModel.addNewRevokedToken(userId, accessToken);
	}
}

module.exports = new TokenService(jwtOptions);
