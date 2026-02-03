const dbInterface = require("@/config/db");

class RevokedTokenModel {
	constructor(dbInterface) {
		this.dbInterface = dbInterface;
	}

	async addNewRevokedToken(userID, accessToken) {
		const [result] = await this.dbInterface.query(
			`INSERT INTO revoked_tokens (user_id, access_token) VALUES (?, ?)`,
			[userID, accessToken]
		);
		return result;
	}

	async isTokenRevoked(accessToken) {
		const [rows] = await this.dbInterface.query(
			`SELECT * FROM revoked_tokens WHERE access_token = ? LIMIT 1`,
			[accessToken]
		);
		return rows.length > 0;
	}
}

module.exports = new RevokedTokenModel(dbInterface);
