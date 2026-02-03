const { rateLimit } = require("express-rate-limit");

// Implementation of rate limiter middleware
function createRateLimiter(options) {
	const { windowMs, maxRequests, message } = options;
	const limiter = rateLimit({
		windowMs,
		max: maxRequests,
		message,
		handler
	});
	return limiter;
}

const apiRateLimiter = {
	windowMs: 60000,
	maxRequests: 100,
	message: "Too many requests"
};

function handler(req, res, next) {
	return res.error(429, "Too many requests, please try again later.");
}

module.exports = { default: createRateLimiter, apiRateLimiter };
