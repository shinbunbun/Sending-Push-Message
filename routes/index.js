const express = require('express');
const app = express();
const router = express.Router();
//console.log(0);
// デフォルトルーティング
router.get('/', function (request, response) {
    //console.log(1);
    response.render('index');
    //console.log(2);
});
//console.log(3);
module.exports = router;