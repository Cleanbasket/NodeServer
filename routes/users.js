var express = require('express');
var request = require("request");

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function sendJandi() {

  var options = { method: 'POST',
    url: 'https://wh.jandi.com/connect-api/webhook/11486269/892fffb7e591385fb67d5e3621f7c2c7',
    headers:
    { 'postman-token': '3ca79cf8-2612-7716-b24b-e1c9fbf97776',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      accept: 'application/vnd.tosslab.jandi-v2+json' },
    body:
    { body: '[결제문의] 결제는 언제 이루어지나요? ',
      connectColor: '#FAC11B',
      connectInfo:
          [ { title: '문의내용',
            description: '결제는 언제 이루어지는지 알고 싶습니다. 선결제도 되는 것인가요? 최대한 빨리 답장부탁드립니다. ' },
            { title: '첨부파일',
              description: '첨부첨부',
              imageUrl: 'http://cfile23.uf.tistory.com/image/255D6A3552A1760A3B160D' },
            { title: '고객정보',
              description: '이름(홍길동), 휴대폰번호(01028432671), 이메일(theodore.cha@cleanbasket.co.kt), 답변받기(이메일답변)' } ] },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

module.exports = router;
