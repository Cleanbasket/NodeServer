var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var multer  =   require('multer');
var fs = require('fs');
var formidable = require('formidable');
var storage =   multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (req, file, callback) {
        var imageName =  Date.now() + '-' + file.originalname;
        imagePath = "http://localhost:3000/images/" +  imageName;

        callback(null, imageName);
    }
});
var upload = multer({ storage : storage}).single('image');


/*
 * API RULE
 *
 * URL : api.cleanbasket.co.kr/inquiry
 * Method : POST
 *
 */

function sendJandi(inquiry) {

    var options = { method: 'POST',
        url: 'https://wh.jandi.com/connect-api/webhook/11486269/892fffb7e591385fb67d5e3621f7c2c7',
        headers:
        { 'postman-token': '3ca79cf8-2612-7716-b24b-e1c9fbf97776',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            accept: 'application/vnd.tosslab.jandi-v2+json' },
        body:
        { body: '['  + inquiry.type +'문의] '+ inquiry.title,
            connectColor: '#FAC11B',
            connectInfo:
                [ { title: '문의내용',
                    description: inquiry.contents },
                    { title: '첨부파일',
                        imageUrl: inquiry.file },
                    { title: '고객정보',
                        description: '이름('+ inquiry.name+'), 휴대폰번호('+inquiry.phone+'), 이메일('+inquiry.email+'), 답변받기('+inquiry.answer_type+')' } ] },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

// 파일 업로드
router.post('/upload', function(req, res) {

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

        console.log(imagePath);

        res.end(imagePath);
    });

});

// 문의 추가하기
router.post('/', function(req, res) {

    gInquiry = {
        type: req.body.type,
        title: req.body.title,
        contents: req.body.contents,
        file: req.body.file,
        name: req.body.name,
        phone: req.body.phone,
        file: req.body.file,
        email: req.body.email,
        answer_type: req.body.answer_type
    };

    sendJandi(gInquiry);

    res.send("OK");
});

module.exports = router;
