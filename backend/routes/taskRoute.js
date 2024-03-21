const taskRouter = require('express').Router();
const {authenticateToken, isLoggedIn} = require('../middleware/auth.js');
const {addTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController.js')

taskRouter.post('/add', authenticateToken, isLoggedIn, addTask);
taskRouter.get('/get', authenticateToken, isLoggedIn, getTasks);
taskRouter.put('/update/:id', authenticateToken, isLoggedIn, updateTask);
taskRouter.delete('/delete/:id', authenticateToken, isLoggedIn, deleteTask);


module.exports = taskRouter;