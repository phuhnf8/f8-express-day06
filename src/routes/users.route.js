const userController = require("@/controllers/user.controller");
const authRequired = require("@/middlewares/authRequired");
const { Router } = require("express");

const userRouter = Router();

userRouter.use(authRequired);

userRouter.get("/profile", userController.getProfile);

module.exports = userRouter;
