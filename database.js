const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hernannovara:g4cmUcsH1BZWlXwD@eit.8nc1ew9.mongodb.net/tasksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectarse a MongoDB:', err.message);
});