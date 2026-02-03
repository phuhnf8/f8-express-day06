const DbError = require("@/errors/dbError");
const InputError = require("@/errors/inputError");
const userModel = require("@/models/user.model");

class UserService {
	constructor() {}

	async findUserByEmail(email) {
		if (!email || email.trim().length === 0)
			throw new InputError("Email is required");
		const user = await userModel.findUserByEmail(email);
		if (!user) return null;
		return user;
	}

	async findUserById(id) {
		const user = await userModel.findUserById(id);
		if (!user) throw new DbError("User not found", DbError.NO_ROW_ERROR);
		return user;
	}
}

module.exports = new UserService();
