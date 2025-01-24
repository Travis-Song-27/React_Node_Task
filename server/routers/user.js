const Router = require('express');
const { getAllTasks, createNewTask, updateATask, deleteATask } = require('../controllers/user');

const userRouter = Router();

userRouter.get("/tasks", getAllTasks);

userRouter.post("/tasks", createNewTask);

userRouter.put("/tasks/:id", updateATask);

userRouter.delete("/tasks/:id", deleteATask);


module.exports = userRouter