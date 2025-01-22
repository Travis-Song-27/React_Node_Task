const Router = require('express');
const { getAllTasks, createNewTask, updateATask, deleteATask } = require('../controllers/task');

const taskRouter = Router();

taskRouter.get("/tasks", getAllTasks);

taskRouter.post("/tasks", createNewTask);

taskRouter.put("/tasks/:id", updateATask);

taskRouter.delete("/tasks/:id", deleteATask);


module.exports = taskRouter