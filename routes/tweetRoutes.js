const express = require('express');
const router = express.Router();
const { createTweetValidationRules } = require('../validation/tweetValidation');
const { createTweet, getTweets } = require('../controllers/tweetController');

router.post('/create', createTweetValidationRules(), createTweet);
router.get('/', getTweets);

module.exports = router;
