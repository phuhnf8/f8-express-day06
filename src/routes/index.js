const handleError = require("@/config/handleError/index");
const {
	default: createRateLimiter,
	apiRateLimiter
} = require("@/middlewares/err/rateLimiter");
const responseFormat = require("@/middlewares/output/responseFormat");
const authRouter = require("@/routes/auth.route");
const restAPIRouter = require("@/routes/rest.route");

/**
 * Main entry for routing setup.
 * @param {Express} app Express application instance.
 */
function handleRoutes(app) {
	// Restful API
	app.use("/api", createRateLimiter(apiRateLimiter), restAPIRouter);

	// Authentication
	app.use("/auth", createRateLimiter(apiRateLimiter), authRouter);

	// Default gateway route
	app.get("/", (req, res) => {
		res.success({ message: "Welcome to the API" });
	});

	// Error handling
	handleError(app);
}

module.exports = handleRoutes;
