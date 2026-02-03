const dbInterface = require("@/config/db");

class UserModel {
	async createUser(newUserData) {
		const { id, username, email, password } = newUserData;
		const [result] = await dbInterface.query(
			`INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`,
			[id, username, email, password]
		);
		return result;
	}

	async findUserByEmail(email) {
		const [rows] = await dbInterface.query(
			`SELECT * FROM users WHERE email = ? LIMIT 1`,
			[email]
		);
		return rows[0];
	}

	async findUserById(id) {
		const [rows] = await dbInterface.query(
			`SELECT * FROM users WHERE id = ? LIMIT 1`,
			[id]
		);
		return rows[0];
	}

	async findUserByEmail(email) {
		const [rows] = await dbInterface.query(
			`SELECT * FROM users WHERE email = ?`,
			[email]
		);
		return rows[0];
	}

	async findAllConversations(userId) {
		// Provide details of all conversations a user is participating in
		const [rows] = await dbInterface.query(
			`SELECT c.* FROM conversation_participants AS cp INNER JOIN conversations AS c ON cp.conversation_id = c.id WHERE cp.user_id = 2`,
			[userId]
		);
		return rows;
	}

	async findUsersByIDs(userIDs) {
		const [rows] = await dbInterface.query(
			`SELECT * FROM users WHERE id IN (?)`,
			[userIDs]
		);
		return rows;
	}

	// Update user's details
	async updateRefreshToken(id, old_refresh_token) {
		// SELECT * FROM users WHERE users.refresh_token = ? AND users.refresh_token != '' AND users.refresh_token_ttl > NOW() AND users.id = ?
	}

	async checkValidRefreshToken(id, old_refresh_token) {
		const [rows] = await dbInterface.query(
			`SELECT * FROM users WHERE users.refresh_token = ? AND users.refresh_token != '' AND users.refresh_token_ttl > NOW() AND users.id = ?`,
			[old_refresh_token, id]
		);
		return rows.length > 0;
	}

	async updateRefreshToken(userId, refresh_token, refresh_ttl) {
		const [result] = await dbInterface.query(
			`UPDATE users SET refresh_token = ?, refresh_token_ttl = ? WHERE id = ?`,
			[refresh_token, refresh_ttl, userId]
		);
		return result;
	}
}

module.exports = new UserModel();
