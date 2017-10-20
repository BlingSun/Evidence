/**
 * Created by SDH on 2017/8/9.
 */
var phantom = require("phantom");
var _ph, _page, _outObj;
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});

var select="select href from report where step=1 limit 0,3";
connection.query(select, function (error, c, fields) {
    if (error) {
        console.log('[SELECT ERROR] - ', error.message);
        return;
    }
    console.log('--------------------------SELECT count----------------------------');
    console.log(c);
    var datalength=c.length;
    console.log(c.length);
    if(datalength>0){

            phantom.create().then(function (ph) {
                ph.createPage().then(function (page) {
                    //page.setting('userAgent', 'foo app');
                    page.property('viewportSize', {width: 1024, height: 800});
                    for(var i=0;i<datalength;i++) {
                        var href = c[i].href;
                        console.log("hh==" + href);
                        page.open(href).then(function (status) {
                            page.evaluate(function () {
                                //return document.getElementsByTagName('title');
                                return document.getElementsByTagName('html')[0].getBoundingClientRect();
                            }).then(function (bb) {
                                //if(html.length>0){
                                //
                                //    console.log(html[0].innerHTML);
                                //}

                                // 按照实际页面的高度，设定渲染的宽高
                                page.property('clipRect', {
                                    top: bb.top,
                                    left: bb.left,
                                    width: bb.width,
                                    height: bb.height
                                });
                                console.log(bb);

                                href = href.replace("http://", "");
                                var h = href + '.png';
                                console.log(h);
                                page.render(h);

                                var content = page.property('content');
                                console.log("==============content================");
                                //console.log(content);

                                page.close();
                                /*ph.exit();*/
                            });


                        });
                    }
                });
            });
        }
});