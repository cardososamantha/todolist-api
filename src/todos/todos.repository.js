class TodosRepository {
	constructor() {
		this.todos = [];
	}

	listTodos = () => {
		const filteredTodos = this.todos.filter((todos) => {
			return !todos.deletedAt;
		});

		return filteredTodos;
	};

	findTodoById = (id) => {
		const todo = this.todos.find((todo) => todo.id === id);

		if (todo.deletedAt) return;

		return todo;
	};

	createTodo = (data) => {
		this.todos.push(data);
	};

	updateTodo = ({ id, data }) => {
		const todoIndex = this.todos.findIndex((todo) => todo.id === id);

		if (todoIndex < 0) throw new Error();

		if (this.todos[todoIndex].deletedAt) throw new Error();

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
