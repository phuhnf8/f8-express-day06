const AuthController = require("@/controllers/auth.controller");
const authRequired = require("@/middlewares/authRequired");
const { Router } = require("express");

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

authRouter.post("/refresh-token", AuthController.refreshToken);
authRouter.post("/logout", authRequired, AuthController.logout);

authRouter.get("/check", authRequired, async (req, res, next) => {
	res.success({ message: "Token is valid" });
});

module.exports = authRouter;
