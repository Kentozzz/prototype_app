require('./database');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const { mongoURI, port } = require('./config');
const TweetModel = require('./models/Tweet');
const { body, validationResult } = require('express-validator');

// 新しいツイートをデータベースに保存するためのPOSTエンドポイント
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

