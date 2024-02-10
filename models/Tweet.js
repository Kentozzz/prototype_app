const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// カラム情報作成
const TweetModelSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  user_name: { type: String, required: true },
});

module.exports = mongoose.model('Tweet', TweetModelSchema);
