const express = require('express');
const router = express.Router();
const Task = require('../models/task');


async function getTask(req, res, next) {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.task = task; 
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});


router.put('/:id', getTask, async (req, res) => {
  try {
    const { title, description } = req.body;
    res.task.title = title;
    res.task.description = description;
    await res.task.save();
    res.json(res.task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;