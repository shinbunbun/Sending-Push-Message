const express = require('express');
const bodyParser = require('body-parser');

// express の実態 Application を生成
const app = express();

app.use(bodyParser.json());
// テンプレートエンジンを EJS に設定
app.set('views', './views');
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));
app.use('/pic', express.static('public'));
// ルーティング設定
app.post('/post', require('./others/post.js'));
app.use('/', require('./routes/index.js'));

// サーバーをポート 3000 で起動
app.listen(3000);

// アプリケーション開始ログ
console.log('Server running at http://localhost:3000');