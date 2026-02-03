function responseFormat(req, res, next) {
	res.success = function (data, status = 200) {
		return res.status(status).json({
			status: "success",
			data: data
		});
	};

	/**
	 *
	 * @param {*} status
	 * @param {*} message
	 * @param {*} error
	 * @returns
	 */
	res.error = function (status, message, error = null) {
		return res.status(status).json({
			status: "error",
			error: error,
			message: message
		});
	};

	return next();
}

module.exports = responseFormat;
