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

// バリデーションルールを適用するために必要な関数をexpress-validatorからインポート
const { body, validationResult } = require('express-validator');

app.post('/api/tweet/create', [
  body('title')
    .trim() // 前後の空白を削除
    .not().isEmpty().withMessage('タイトルは必須です') // 空でないことを確認
    .custom(value => value.replace(/\s/g, '').length > 0).withMessage('タイトルには有効な文字を入力してください'), // スペースのみの入力を防止
  body('image')
    .trim() // 前後の空白を削除
    .not().isEmpty().withMessage('画像URLは必須です') // 空でないことを確認
    .custom(value => value.replace(/\s/g, '').length > 0).withMessage('画像URLには有効な文字を入力してください'), // スペースのみの入力を防止
  body('user_name')
    .trim() // 前後の空白を削除
    .not().isEmpty().withMessage('ユーザー名は必須です') // 空でないことを確認
    .custom(value => value.replace(/\s/g, '').length > 0).withMessage('ユーザー名には有効な文字を入力してください'), // スペースのみの入力を防止
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("エラー発生!")
    return res.status(400).json({ errors: errors.array() });
  }
  

  try {
    const newTweet = new TweetModel(req.body);
    const savedTweet = await newTweet.save();
    res.status(201).json(savedTweet);
  } catch (error) {
    res.status(400).json({ message: "ツイートの保存に失敗しました", error: error.toString() });
  }
});

app.use(express.static('dist')); // Vueアプリのビルドファイルが格納されているディレクトリを指定

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Vueアプリのエントリーポイントを指定
});

app.get('/tweets/new', (req, res) => {
  res.sendFile(__dirname + '/views/new-tweet.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

