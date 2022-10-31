const crypto = require('crypto');

class Todo {
	id;
	title;
	description;
	status;
	createdAt;
	deletedAt;

	constructor() {
		if (!this.id) {
			this.id = crypto.randomUUID();
		}
	}
}

module.exports = Todo;
