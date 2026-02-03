const authRequired = require("@/middlewares/authRequired");
const todosRouter = require("@/routes/todos.route");
const userRouter = require("@/routes/users.route");

const restAPIRouter = require("express").Router();

restAPIRouter.use("/users", authRequired, userRouter);
restAPIRouter.use("/todos", authRequired, todosRouter);
restAPIRouter.get("/", (req, res, next) => {
	return res.success({ message: "API is working" });
});

module.exports = restAPIRouter;
