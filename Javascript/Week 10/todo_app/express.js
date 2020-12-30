const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

app.listen(3000, (err) => {
	if (err) { console.error (err); }
	console.log('Listening on 3000');
});

app.use(express.json());

app.use('/tasks', tasksRouter);

// const db = require('./db/db.js');
// app.get('/tasks', (req, res) => {
// 	db.all('SELECT * FROM todos', (err, data) => {
// 		console.log('err', err);
// 		console.log('data', data);
// 		if (err) {
// 			console.error('Error listing tasks');
// 			res.json({
// 				"success": false
// 			})
// 		} else {
// 			res.json({
// 				"success": true,
// 				"tasks": data
// 			})
// 		}
// 	})
// })

// app.post('/tasks/create', (req, res) => {
// 	db.run('INSERT INTO todos (name, status) VALUES (?, ?)', [name, 'yet to done'], (err) => {
// 		if (err) {
// 			console.error('Error inserting task');
// 			res.json({
// 				"success": false
// 			})
// 		} else {
// 			res.json({
// 				"success": true
// 			})
// 		}
// 	})
// })
