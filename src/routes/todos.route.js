const todosController = require("@/controllers/todos.controller");
const { Router } = require("express");

const todosRouter = Router();

todosRouter.post("/new", todosController.createTodo);
todosRouter.get("/:id", todosController.getTodoById);
todosRouter.delete("/:id", todosController.deleteTodo);
todosRouter.get("/", todosController.getTodos);
module.exports = todosRouter;
