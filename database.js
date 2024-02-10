const mongoose = require('mongoose');
const { mongoURI } = require('./config');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoDBに接続
.then(() => {
  console.log("Success: connect to mongoDB")
})
.catch((error) => {
  console.error("Failure: Unconnected to MongoDB")
})
