require('./database');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const tweetRoutes = require('./routes/tweetRoutes');
app.use('/api/tweet', tweetRoutes);

const { port } = require('./config');
const TweetModel = require('./models/Tweet');
const { body, validationResult } = require('express-validator');
require('./controllers/tweetController');

app.use(express.static('dist')); // Vueアプリのビルドファイルが格納されているディレクトリを指定

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

