const InputError = require("@/errors/inputError");
const todosModel = require("@/models/todos.model");
const crypto = require("crypto");
class TodosService {
	createTodo(userId, requestPayload) {
		const { title } = requestPayload;
		if (!userId || !title) {
			throw new InputError("Invalid input data");
		}
		const todoID = crypto.randomUUID();
		const todoData = {
			id: todoID,
			createdBy: userId,
			title: title
		};
		return todoData;
	}

	async addNewTodo(userId, requestPayload) {
		const todoData = this.createTodo(userId, requestPayload);
		await todosModel.addTodo(todoData);
		return todoData;
	}

	async getTodosByUser(userId) {
		const todos = await todosModel.viewTodosByUser(userId);
		return todos;
	}

	async deleteTodo(userId, todoId) {
		await todosModel.deleteTodoById(userId, todoId);
	}

	async getTodoById(userId, todoId) {
		const todo = await todosModel.viewTodoById(userId, todoId);
		return todo;
	}
}

module.exports = new TodosService();
