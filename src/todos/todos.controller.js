const Todo = require('./todos.model');

class TodosController {
	constructor(todosRepository) {
		this.todosRepository = todosRepository;
	}

	list = (request, response) => {
		const todos = this.todosRepository.listTodos();
		return response.json(todos);
	};

	findById = (request, response) => {
		const { id } = request.params;
		const todo = this.todosRepository.findTodoById(id);

		if (!todo) return response.status(404).json({ message: 'todo not found' });

		return response.json(todo);
	};

	create = (request, response) => {
		const { title, description, status } = request.body;
		const todo = new Todo();

		Object.assign(todo, {
			title,
			description,
			status,
			createdAt: new Date(),
		});

		this.todosRepository.createTodo(todo);
		return response.status(201).json({ id: todo.id });
	};

	update = (request, response) => {
		const { id } = request.params;
		const { title, description, status } = request.body;

		this.todosRepository.updateTodo({
			id,
			data: {
				title,
				description,
				status,
			},
		});

		return response.status(204).json({ message: 'sucess' });
	};

	delete = (request, response) => {
		const { id } = request.params;
		this.todosRepository.deleteTodo(id);

		return response.status(204).send();
	};
}

module.exports = TodosController;
