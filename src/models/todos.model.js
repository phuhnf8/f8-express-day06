const dbInterface = require("@/config/db");

class TodosModel {
	constructor(dbInterface) {
		this.db = dbInterface;
	}

	async addTodo(todoData) {
		const { id, createdBy, title } = todoData;
		await this.db.query(
			"INSERT INTO todos (id, created_by, title) VALUES (?, ?, ?)",
			[id, createdBy, title]
		);
	}

	async viewTodosByUser(userId) {
		const [rows] = await this.db.query(
			"SELECT * FROM todos WHERE created_by = ?",
			[userId]
		);
		return rows;
	}

	async deleteTodoById(userId, todoId) {
		await this.db.query(
			"DELETE FROM todos WHERE id = ? AND created_by = ?",
			[todoId, userId]
		);
	}

	async viewTodoById(userId, todoId) {
		const [rows] = await this.db.query(
			"SELECT * FROM todos WHERE id = ? AND created_by = ?",
			[todoId, userId]
		);
		return rows[0];
	}
}

module.exports = new TodosModel(dbInterface);
