var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.urlencoded({
  extended: false
}));
app.use(bp.json());
app.use(express.static('./'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
