// validation/tweetValidation.js
const { body } = require('express-validator');

exports.createTweetValidationRules = () => {
  return [
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

  ];
}
