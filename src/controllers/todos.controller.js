const todosService = require("@/services/todos.service");

class TodosController {
	// POST /api/todos/new
	async createTodo(req, res, next) {
		try {
			const todoData = await todosService.addNewTodo(
				req.user.id,
				req.body
			);
			res.success({ todo: todoData });
		} catch (error) {
			next(error);
		}
	}

	// GET /api/todos/
	// To-do: Add queries for filtering, pagination, etc.
	async getTodos(req, res, next) {
		try {
			const todos = await todosService.getTodosByUser(req.user.id);
			res.success({ todos });
		} catch (error) {
			next(error);
		}
	}

	// GET /api/todos/:id
	async getTodoById(req, res, next) {
		try {
			const todoId = req.params.id;
			const todo = await todosService.getTodoById(req.user.id, todoId);
			res.success({ todo });
		} catch (error) {
			next(error);
		}
	}

	// DELETE /api/todos/:id
	async deleteTodo(req, res, next) {
		try {
			const todoId = req.params.id;
			await todosService.deleteTodo(req.user.id, todoId);
			res.success({ message: "Todo deleted successfully" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TodosController();
