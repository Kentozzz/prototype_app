const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetModelSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  user_name: { type: String, required: true }
});

const TweetModel = mongoose.model('Tweet', TweetModelSchema);
mongoose.connect("mongodb+srv://kento012:wL9svTLAPEX3AiP6SHe@cluster0.j3l0owe.mongodb.net/PrototypeAppDb?retryWrites=true&w=majority")
// ↑これはいずれ環境変数化が必要
.then(() => {
  console.log("Success: connect to mongoDB")
})
.catch((error) => {
  console.error("Failure: Unconnected to MongoDB")
})

// ミドルウェアを設定してJSONリクエストボディを解析できるようにします
app.use(express.json());

// 新しいツイートをデータベースに保存するためのPOSTエンドポイント
app.post('/api/tweet/create', async (req, res) => {
  console.log(req.body)
  try {
    const newTweet = new TweetModel(req.body);
    const savedTweet = await newTweet.save();
    res.status(201).json(savedTweet);
  } catch (error) {
    res.status(400).json({ message: "ツイートの保存に失敗しました", error });
  }
});

// JSONの解析を許可
app.use(express.json());

// すべてのユーザーを取得するエンドポイント
app.get('/api/tweets', async (req, res) => {
  try {
    const tweets = await TweetModel.find();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: "データを取得中にエラーが発生しました", error });
  }
});


app.use(express.static('dist')); // Vueアプリのビルドファイルが格納されているディレクトリを指定

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

