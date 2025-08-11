const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST = 'mongodb+srv://Jackie:hBleuj5E8Ve4s4PU@firsrtcluster.uekzuah.mongodb.net/books_reader?retryWrites=true&w=majority&appName=FirsrtCluster';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(4000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })