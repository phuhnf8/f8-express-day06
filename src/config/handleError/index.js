const exceptionHandler = require("@/middlewares/err/exceptionHandler");
const notFoundHandler = require("@/middlewares/err/notFoundHandler");

function handleError(app) {
	app.use(notFoundHandler);
	app.use(exceptionHandler);
}

module.exports = handleError;
