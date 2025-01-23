const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    const formattedTasks = tasks.map(task => ({
      ...task.toObject(),
      _id: task._id.toString(), 
    }));

    res.status(201).json({success: true, message: "all tasks get: ", formattedTasks});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

  

const createNewTask = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      console.log("No content uploaded here");
      return res.status(400).json({success: false, error: "task title is required"});
    }
    
    const newTask = new Task({
      content: content,
      completed: false
    })


    await newTask.save();

    res.status(201).json({success: true, message: "New task added with: " + newTask.content, unique_id: newTask._id.toString()});

  } catch (err) {
    console.error("Error occurred:", err); 
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
    
}
  
  

const updateATask = async (req, res) => {
  try {
    const taskId = req.params?.id
    const {content, completed} = req.body;

    const updatedTask = await Task.findById(taskId);
    
    if (!updatedTask) {
      return res.status(404).json({error: "Task not found"});
    }

    if (content !== null) updatedTask.content = content;
    if (completed !== null) updatedTask.completed = completed;

    await updatedTask.save();

    res.status(200).json({success: true, message: `Task with id: ${taskId} is updated`});

  } catch(err) {
    console.log(err.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
}
  

const deleteATask = async (req, res) => {
  try {
    const taskId = req.params?.id
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
        return res.status(404).json({success: false, message: "Task not found"});
    }  

    res.status(200).json({success: true, message: `The task with id ${taskId} is deleted.`, deleted_id: taskId});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
}

module.exports = { getAllTasks, createNewTask, updateATask, deleteATask };