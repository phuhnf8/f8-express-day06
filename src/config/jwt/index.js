const crypto = require("crypto");
const jwt = {
	sign(payload, key) {
		const header = {
			alg: "HS256",
			typ: "JWT"
		};
		const headerBase64 = Buffer.from(JSON.stringify(header)).toString(
			"base64url"
		);
		const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
			"base64url"
		);

		const headerAndPayload = `${headerBase64}.${payloadBase64}`;
		const signature = crypto
			.createHmac("sha256", key)
			.update(headerAndPayload)
			.digest("base64url");
		return `${headerAndPayload}.${signature}`;
	},

	verify(token, key, options = {}) {
		try {
			const [headerBase64, payloadBase64, signature] = token.split(".");
			const headerAndPayload = `${headerBase64}.${payloadBase64}`;
			const expectedSignature = crypto
				.createHmac("sha256", key)
				.update(headerAndPayload)
				.digest("base64url");
			return {
				bool: signature === expectedSignature,
				payload: JSON.parse(
					Buffer.from(payloadBase64, "base64url").toString()
				)
			};
		} catch (error) {
			return null;
		}
	}
};

const jwtOptions = {
	secret_key: process.env.SECRET_KEY || "default_secret_key",
	ttl: 3600, // Token time-to-live in seconds
	refresh_ttl: 7 * 24 * 3600 // Refresh token time-to-live in seconds (7 days    )
};

module.exports = {
	jwt,
	jwtOptions
};
