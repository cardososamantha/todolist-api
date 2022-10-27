const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());

const todos = [];

app.get('/todos', (request, response) => {
	// TODO: must be refactored to not list todos with deleted:true

	return response.json(todos);
});

app.get('/todos/:id', (request, response) => {
	// TODO: must be refactored to not list todos with deleted:true

	const { id } = request.params;
	const todo = todos.find((todo) => todo.id === id);

	if (!todo) return response.status(404).json({ message: 'todo not found' });

	return response.json(todo);
});

app.post('/todos', (request, response) => {
	const todo = {
		id: crypto.randomUUID(),
		...request.body,
		createdAt: new Date(),
		deleted: false,
	};

	todos.push(todo);
	return response.status(201).json({ id: todo.id });
});

app.put('/todos/:id', (request, response) => {
	// TODO: must be refactored to not update todos with deleted:true

	const { id } = request.params;
	const todoIndex = todos.findIndex((todo) => todo.id === id);

	if (todoIndex < 0)
		return response.status(404).json({ message: 'todo not found' });

	todos[todoIndex] = {
		...todos[todoIndex],
		...request.body,
	};

	return response.status(204).json({ message: 'sucess' });
});

app.delete('/todos/:id', (request, response) => {
	const { id } = request.params;
	const todoIndex = todos.findIndex((todo) => todo.id === id);

	todos[todoIndex] = {
		...todos[todoIndex],
		deleted: true,
	};

	return response.json();
});

app.listen(3000, console.log('Servidor iniciado.'));
