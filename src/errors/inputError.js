// Include custom status error for input validation

class InputError extends Error {
	static BAD_REQUEST = 400;
	static DUPLICATED = 409;
	static BANNED = 403;
	static NOT_FOUND = 404;

	constructor(message, errno = 400) {
		super(message);
		this.name = "InputError";
		this.status = errno;
	}
}
module.exports = InputError;
