const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

app.use(cors());
app.use(express.json());

const DATA_FILE = './tasks.json'

// Read the data from DATA_FILE
const readTasks = () => {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]))
    }
    const rawData = fs.readFileSync(DATA_FILE);
    return JSON.parse(rawData);
}

// Write Tasks from DATA_FIlE
const writeTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2))
}


app.get("/", (req, res) => {
  res.send("Hello world");
});


// 1. GET - get all tasks;
app.get("/api/tasks", (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
    res.status(201).json({success: true, message: "all tasks get"});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
})


// 2. POST  - Add a new task
app.post("/api/tasks", (req, res) => {
    try {
      const { content, id } = req.body;
      if (!content) {
        console.log("No content uploaded here");
        return res.status(400).json({success: false, error: "task title is required"});
      }
      
      const tasks = readTasks();
      const newTask = {
        id: id,
        content: content,
        completed: false
      }

      tasks.push(newTask);

      writeTasks(tasks);

      res.status(201).json({success: true, message: "New task added with: " + newTask.content});

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
})


// 3. PUT - Update a task by ID
app.put("/api/tasks/:id", (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const {content, completed} = req.body;

        const tasks = readTasks();

        const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId, 10));
        
        if (taskIndex === -1) {
            return res.status(404).json({error: "Task not found"});
        }

        if (content !== "N/A") tasks[taskIndex].content = content;
        if (completed !== "N/A") tasks[taskIndex].completed = completed;

        writeTasks(tasks);

        res.status(200).json({success: true, message: `Task with id: ${taskId} is updated`});

    } catch(err) {
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

// 4. DELETE - Delete a task by ID
app.delete("/api/tasks/:id", (req, res) => {
    try {
        const tasks = readTasks();

        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({success: false, message: "Task not found"});
        }

        tasks.splice(taskIndex, 1);

        writeTasks(tasks);

        res.status(200).json({success: true, message: `The task with id ${taskId} is deleted.`});
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