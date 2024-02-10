// controllers/tweetController.js
const TweetModel = require('../models/Tweet');
const { validationResult } = require('express-validator');

exports.createTweet = async (req, res) => {
    // ツイート作成のロジック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // バリデーションエラーがある場合、400 Bad Request レスポンスを返す
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // 新しいツイートのインスタンスを作成
    const newTweet = new TweetModel({
      title: req.body.title,
      image: req.body.image,
      user_name: req.body.user_name
    });

    // データベースに保存
    const savedTweet = await newTweet.save();

    // 成功した場合、保存されたツイートをレスポンスとして返す
    res.status(201).json(savedTweet);
  } catch (error) {
    // 何らかのエラーが発生した場合、エラーメッセージを含むレスポンスを返す
    res.status(400).json({
      message: "ツイートの保存に失敗しました",
      error: error.toString()
    });
  }
};

exports.getTweets = async (req, res) => {
  try {
    const tweets = await TweetModel.find();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: "データを取得中にエラーが発生しました", error });
  }
};
