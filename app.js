const express = require('express');
const mongoose = require('mongoose');
const app = express();
const tasksRouter = require('./routes/tasks');


require('./database');

app.use(express.json());


app.use('/tasks', tasksRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});