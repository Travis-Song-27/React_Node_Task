// import cors from "cors";
// import connectDB from "./db/index.js";
// import userRouter from "./routers/users.js";
// import productRouter from "./routers/products.js";
// import {} from "dotenv/config";

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

app.use(cors());
app.use(express.json());

let tasks = [];

// app.use("/api", userRouter);
// app.use("/api", productRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 1. POST  - Add a new task
app.post("/todoList", (req, res) => {
    try {
      const { content, globalId } = req.body;
        if (!content) {
            return res.status(400).json({success: false, error: "task title is required"});
        }
        else {
            const newTask = {
                id: globalId,
                content,
                completed: false
            }
            tasks.push(newTask),
            res.status(201).json({success: true, message: "New task added with" + newTask.content});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
})

// 2. GET - Retrieve all tasks
app.get("/todoList", (req, res) => {
    res.status(200).json(tasks.length ? tasks : "No element in tasks")
})

// 3. PUT - Update a task by ID
app.put("/todoList/:id", (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const {content, completed} = req.body;

        const task = tasks.find((task) => task.id === taskId);
        
        if (!task) {
            return res.status(404).json({error: "Task not found"});
        }

        if (content) task.content = content;
        if (completed !== undefined) task.completed = completed;

        res.status(200).json({success: true, message: `Task with id: ${taskId} is updated`});
    } catch(err) {
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

// 4. DELETE - Delete a task by ID
app.delete("/todoList/:id", (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({success: false, message: "Task not found"});
        }

        tasks.splice(taskIndex, 1);
        res.status(200).json();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true,
// }));

// app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});