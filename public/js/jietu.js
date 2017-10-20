/**
 * Created by SDH on 2017/7/17.
 */
var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
        //page.setting('userAgent', 'foo app');
        page.property('viewportSize', {width: 1024, height: 800});
        page.open('http://www.baidu.com').then(function (status) {

            console.log(status);
           if(status=="success"){
               page.evaluate(function() {
                   //return document.getElementsByTagName('title');
                   return document.getElementsByTagName('html')[0].getBoundingClientRect();
               }).then(function(bb){
                   //if(html.length>0){
                   //
                   //    console.log(html[0].innerHTML);
                   //}

                   // 按照实际页面的高度，设定渲染的宽高
                   page.property('clipRect',{
                       top:    bb.top,
                       left:   bb.left,
                       width:  bb.width,
                       height: bb.height
                   });
                   console.log(bb);
                   page.render('baidu.png');
                   var content=page.property('content');
                   console.log("================================");
                   //console.log(content);
                   console.log("================================");

                   page.close();
                   ph.exit();
               });
           }
        });
    });
});