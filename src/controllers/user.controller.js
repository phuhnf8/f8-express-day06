const userService = require("@/services/user.service");

class UserController {
	// GET /api/users/profile
	async getProfile(req, res, next) {
		const userId = req.user.id;
		const { email, id } = await userService.findUserById(userId);
		return res.success({ user: { email, id } });
	}

	// GET /api/users/search?email=
	async searchUsers(req, res, next) {
		const emailQuery = req.query?.q ?? "";
		const result = await userService.findUserByEmail(emailQuery);
		if (!result) {
			return res.success({ user: {} });
		} else {
			const { email, id } = result;
			return res.success({ user: { email, id } });
		}
	}
}

module.exports = new UserController();
