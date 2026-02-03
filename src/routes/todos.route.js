const { Router } = require("express");

const todosRouter = Router();

todosRouter.get("/", (req, res, next) => {
	res.success({ message: "List of todos" });
});

module.exports = todosRouter;
