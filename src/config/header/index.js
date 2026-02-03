const responseFormat = require("@/middlewares/output/responseFormat");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
/**
 * Bring all header config together here.
 * @param {Express} app Express app instance
 */
function assignHeader(app) {
	// Middleware to format all responses
	app.use(responseFormat);

	app.set("trust proxy", 1); // trust first proxy
	app.use(express.json({}));
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());
	app.use(morgan("dev"));
}

module.exports = assignHeader;
