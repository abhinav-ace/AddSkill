const router = require('express').Router();
const taskModifiers = require('../controllers/tasks.js');

router.get('/', taskModifiers.listTasks)

router.post('/create', taskModifiers.createTask);

router.patch('/update', taskModifiers.updateTask);

router.delete('/delete', taskModifiers.deleteTask);

module.exports = router;