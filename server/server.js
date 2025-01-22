const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
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
      const { content } = req.body;
      if (!content) {
        console.log("No content uploaded here");
        return res.status(400).json({success: false, error: "task title is required"});
      }
      
      const tasks = readTasks();
      const newTask = {
        id: uuidv4(),
        content: content,
        completed: false
      }

      tasks.push(newTask);

      writeTasks(tasks);

      res.status(201).json({success: true, message: "New task added with: " + newTask.content, unique_id: newTask.id});

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
})


// 3. PUT - Update a task by ID
app.put("/api/tasks/:id", (req, res) => {
    try {
        const taskId = req.params.id
        const {content, completed} = req.body;

        const tasks = readTasks();

        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        
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

        const taskId = req.params.id
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











/*

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// The database interface of json-server 
const BASE_URL = "http://localhost:3000"; 

// 1. GET
app.get("/api/tasks", async (req, res) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    const tasks = await res.json();
    res.status(201).json({success: true, message: "all tasks get", tasks: tasks});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 2. POST 
app.post("/api/tasks", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      console.log("No content uploaded here");
      return res.status(400).json({success: false, error: "task title is required"});
    }

    const newTask = { id: uuidv4(), content, completed: false };

    const database_response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const createdTask = await database_response.json();

    res.status(201).json({success: true, message: "New task added with: " + newTask.content, createdTask: createdTask});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// 3. PUT 
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { content, completed } = req.body;

    const updatedTask = {};
    if (content !== undefined) updatedTask.content = content;
    if (completed !== undefined) updatedTask.completed = completed;

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    if (response.status === 404) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const task = await response.json();
    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 4. DELETE 
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });

    if (response.status === 404) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: `Task with ID ${id} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/