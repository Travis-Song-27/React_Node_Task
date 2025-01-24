const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const getAllTasks = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id);
    const user_name = "example1@gmail.com";
    const user = await User.findOne({username: user_name});

    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const tasks = user.tasks;

    res.status(201).json({success: true, message: "all tasks get: ", tasks});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

  

const createNewTask = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    console.log("No content uploaded here");
    return res.status(400).json({success: false, error: "task title is required"});
  }

  try {
    // const user = await User.findById(req.user.id);
    const user_name = "example1@gmail.com";
    const user = await User.findOne({username: user_name});

    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newTask = {
      _id: uuidv4(),
      content: content,
      completed: false
    }

    user.tasks.push(newTask);
    await user.save();

    res.status(201).json({success: true, message: "New task added with: " + newTask.content, unique_id: newTask._id});

  } catch (err) {
    console.error("Error occurred:", err); 
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
    
}
  
  

const updateATask = async (req, res) => {
  const taskId = req.params?.id
  const {content, completed} = req.body;

  try {
    // const user = await User.findById(req.user.id);
    const user_name = "example1@gmail.com";
    const user = await User.findOne({username: user_name});

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    const updatedTaskIdx = user.tasks.findIndex((task) => task._id === taskId);

    if (updatedTaskIdx === -1) {
      return res.status(404).json({error: "Task not found"});
    }


    if (content !== null) {
      user.tasks = user.tasks.map((task, idx) => idx === updatedTaskIdx ? {...task, content: content} : task);
    }
    if (completed !== null) {
      user.tasks = user.tasks.map((task, idx) => idx === updatedTaskIdx ? {...task, completed: !task.completed} : task);
    }
    await user.save();

    res.status(200).json({success: true, message: `Task with id: ${taskId} is updated`});

  } catch(err) {
    console.log(err.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
}
  

const deleteATask = async (req, res) => {
  const taskId = req.params?.id;

  try {
    // const user = await User.findById(req.user.id);
    const user_name = "example1@gmail.com";
    const user = await User.findOne({username: user_name});

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const deletedTaskIdx = user.tasks.findIndex((task) => task._id === taskId);
    if (deletedTaskIdx === -1) {
        return res.status(404).json({success: false, message: "Task not found"});
    }  

    user.tasks = user.tasks.filter((_, idx) => idx !== deletedTaskIdx);
    await user.save();

    res.status(200).json({success: true, message: `The task with id ${taskId} is deleted.`, deleted_id: taskId});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
}

module.exports = { getAllTasks, createNewTask, updateATask, deleteATask };