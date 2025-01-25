const Router = require('express');
const { userSignIn, getAllTasks, createNewTask, updateATask, deleteATask } = require('../controllers/user');
const userAuth = require('../middleware/auth')

const userRouter = Router();

userRouter.post("/login", userSignIn);

userRouter.get("/tasks", userAuth, getAllTasks);

userRouter.post("/tasks", userAuth, createNewTask);

userRouter.put("/tasks/:id", userAuth, updateATask);

userRouter.delete("/tasks/:id", userAuth, deleteATask);

module.exports = userRouter;