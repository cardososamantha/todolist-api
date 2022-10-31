const crypto = require('crypto');
const todos = [];

const todosController = {
	list: (request, response) => {
		return response.json(todos);
	},

	findById: (request, response) => {
		const { id } = request.params;
		const todo = todos.find((todo) => todo.id === id);

		if (!todo) return response.status(404).json({ message: 'todo not found' });

		return response.json(todo);
	},

	create: (request, response) => {
		const todo = {
			id: crypto.randomUUID(request, response),
			...request.body,
			createdAt: new Date(request, response),
			deleted: false,
		};

		todos.push(todo);
		return response.status(201).json({ id: todo.id });
	},

	update: (request, response) => {
		const { id } = request.params;
		const todoIndex = todos.findIndex((todo) => todo.id === id);

		if (todoIndex < 0)
			return response.status(404).json({ message: 'todo not found' });

		todos[todoIndex] = {
			...todos[todoIndex],
			...request.body,
		};

		return response.status(204).json({ message: 'sucess' });
	},

	delete: (request, response) => {
		const { id } = request.params;
		const todoIndex = todos.findIndex((todo) => todo.id === id);

		todos[todoIndex] = {
			...todos[todoIndex],
			deleted: true,
		};

		return response.json(request, response);
	},
};

module.exports = todosController;
