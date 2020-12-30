var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./todos.db');

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS todos (name TEXT, status TEXT)', (err) => {
		if (err) { console.error('Error:', err); }
	});
});

module.exports = db;