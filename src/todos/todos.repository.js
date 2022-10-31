class TodosRepository {
	constructor() {
		this.todos = [];
	}

	listTodos = () => {
		//TODO: must be refactored to not list todos with deleted:true
		return this.todos;
	};

	findTodoById = (id) => {
		//TODO: must be refactored to not list todos with deleted:true

		const todo = this.todos.find((todo) => todo.id === id);

		return todo;
	};

	createTodo = (data) => {
		this.todos.push(data);
	};

	updateTodo = ({ id, data }) => {
		//TODO: must be refactored to not list todos with deleted:true

		const todoIndex = this.todos.findIndex((todo) => todo.id === id);

		if (todoIndex < 0) throw new Error();

		Object.assign(this.todos[todoIndex], data);

		return this.todos[todoIndex];
	};

	deleteTodo = (id) => {
		const todoIndex = this.todos.findIndex((todo) => todo.id === id);

		if (todoIndex < 0) throw new Error();

		Object.assign(this.todos[todoIndex], { deletedAt: new Date() });
	};
}

module.exports = TodosRepository;
