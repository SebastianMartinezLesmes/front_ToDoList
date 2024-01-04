const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27027/toDoList', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;
 