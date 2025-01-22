const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');

// 1. GET - get all tasks;
  const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find().select('-_id task_id content completed');
      res.status(201).json({success: true, message: "all tasks get: ", tasks});
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
  
  
  // 2. POST  - Add a new task
  const createNewTask = async (req, res) => {
      try {
        const { content } = req.body;
        if (!content) {
          console.log("No content uploaded here");
          return res.status(400).json({success: false, error: "task title is required"});
        }
        
        const newTask = new Task({
          task_id: uuidv4(),
          content: content,
          completed: false
        })
  
        await newTask.save();
  
        res.status(201).json({success: true, message: "New task added with: " + newTask.content, unique_id: newTask.task_id});
  
      } catch (err) {
          console.log(err.message);
          res.status(500).json({ success: false, message: "Server Error" });
      }
      
  }
  
  
  // 3. PUT - Update a task by ID
  const updateATask = async (req, res) => {
      try {
          const taskId = req.params?.id
          const {content, completed} = req.body;

          const updatedTask = await Task.findOne({ task_id: taskId });
          
          if (!updatedTask) {
              return res.status(404).json({error: "Task not found"});
          }
  
          if (content !== "N/A") updatedTask.content = content;
          if (completed !== "N/A") updatedTask.completed = completed;
  
          await updatedTask.save();
  
          res.status(200).json({success: true, message: `Task with id: ${taskId} is updated`});
  
      } catch(err) {
          console.log(err.message);
          res.status(500).json({success: false, message: "Server Error"});
      }
  }
  
  // 4. DELETE - Delete a task by ID
  const deleteATask = async (req, res) => {
      try {
          const taskId = req.params?.id
          const deletedTask = await Task.findOneAndDelete({ task_id: taskId });
  
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