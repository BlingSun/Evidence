var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});

connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/evidence', function(req, res, next) {

  var select="select count(*) as count from report";

  connection.query(select, function (error, c, fields) {
    if(error){
      console.log('[SELECT ERROR] - ',error.message);
      return;
    }
    console.log('--------------------------SELECT count----------------------------');
    console.log(c[0].count);
    var total=c[0].count;
    var data={
      total:total
    };
    var selectlist="SELECT * from report where id>0 and id<=10";
    connection.query(selectlist, function (error, results, fields) {
      if(error){
        console.log('[SELECT ERROR] - ',error.message);
        return;
      }
      console.log('--------------------------SELECT----------------------------');
      console.log(results);
      data.result=results;
      console.log(data);
      // res.render('report/reportList',data);
      res.json(data);
      console.log('------------------------------------------------------------\n\n');
    });

  });

});

router.get('/page', function(req, res, next) {

  var currentpage=req.query.page;
  console.log("page="+page);
  page(currentpage,res);

});

router.get('/statues1',function(req,res,next){})
router.get('/statues2',function(req,res,next){})
router.get('/statues3',function(req,res,next){})


function page(page,res){
  var selectlist="SELECT * from report where id>? and id<=?";

  var first=page*10-10;
  var last=page*10;
  connection.query(selectlist,[first,last],function (error, results, fields) {
    if(error){
      console.log('[SELECT ERROR] - ',error.message);
      return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(results);
    res.json({ result:results});
    console.log('------------------------------------------------------------\n\n');
  });
}
module.exports = router;
