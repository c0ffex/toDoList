const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
  .connect(
    'mongodb+srv://Coffex:9A4gbgUkNEcwDrTr@cluster0.g6znr8g.mongodb.net/toDoList?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));
