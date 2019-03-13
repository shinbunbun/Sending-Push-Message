const express = require('express');
const app = express();
const router = express.Router();
// デフォルトルーティング
router.get('/', function (request, response) {
    response.render('index');
});
module.exports = router;