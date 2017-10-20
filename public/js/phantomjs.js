/**
 * Created by SDH on 2017/7/17.
 */
var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(ph => {
    _ph = ph;
return _ph.createPage();
}).then(page => {
    _page = page;
return _page.open('http://baidu.com/');
}).then(status => {
    console.log(status);
return _page.property('content')
}).then(content => {
    console.log(content);
_page.close();
_ph.exit();
}).catch(e => console.log(e));