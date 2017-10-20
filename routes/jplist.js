/**
 * Created by SDH on 2017/7/14.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');
var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));


//reportList

/**
 * jplist static properties -----------------------------------------------
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});

connection.connect();

/**
 * instance functions ---------------------------------------------------
 */

/**
 * get doublefilter query
 * @param {Object} status
 * @param {Array.<string>} preparedParams - array of params for prepare statement
 * @param {Object} doubleFilter

 * @return {object}
 * status example
 * {
*     "action": "filter",
*     "name": "title-filter",
*     "type": "textbox",
*     "data": {
*         "path": ".title",
*         "ignore": "[~!@#$%^&*()+=`'\"/\\_]+",
*         "value": "",
*         "filterType": "text"
*     },
*     "cookies": true
* }
 */


var getDoubleFilterQuery = function(status,doubleFilter,preparedParams){

    console.log("===============================");
    var style= ''
        ,name = status.name
        ,data = status.data;
    var styleq=doubleFilter.styleQuery,infoq=doubleFilter.infoStyleQuery;


    if(name && data){
        if(data.path && data.value){
            if(data.path=='.style'){
                switch(data.value){
                    case 'wz':style='网站/客户端链接';
                        break;
                    case 'ss':style='搜索引擎';
                        break;
                    case 'app':style='违法APP';
                        break;
                    case 'js':style='即时通讯账号';
                        break;
                    case 'wp':style='网盘账号';
                        break;
                }


                    if(doubleFilter.styleQuery.indexOf('style') >=0){

                        doubleFilter.styleQuery=doubleFilter.styleQuery.replace(")"," or style = '"+ style+"' )");

                    }
                    else{
                        doubleFilter.styleQuery = "and ( style = '"+ style+"' )";
                    }
                    console.log("============stylequery===========");
                    console.log(doubleFilter.styleQuery);
                    //return doubleFilter.styleQuery;

            }
            if(data.path=='.infostyle'){
                switch(data.value){
                    case 'zz':style='政治类';
                        break;
                    case 'bk':style='暴恐类';
                        break;
                    case 'yy':style='谣言类';
                        break;
                    case 'sq':style='色情类';
                        break;
                    case 'ds':style='低俗类';
                        break;
                    case 'db':style='赌博类';
                        break;
                    case 'zp':style='诈骗类';
                        break;
                    case 'qq':style='侵权类';
                        break;
                    case 'qt':style='其他类';
                        break;
                }


                    if( doubleFilter.infoStyleQuery.indexOf('infostyle') !== -1){

                        doubleFilter.infoStyleQuery= doubleFilter.infoStyleQuery.replace(")"," or infostyle = '"+ style+"' )");

                    }
                    else{

                        doubleFilter.infoStyleQuery = "and ( infostyle = '"+ style+"')";
                    }
                    console.log("============infostylequery===========");
                    console.log( doubleFilter.infoStyleQuery);
                    //return doubleFilter.infoStyleQuery;
                }

            if(data.path=='.person'){
                console.log(data.value);
                doubleFilter.person ="and customer = ' "+data.value+" '";
                preparedParams.push('%' + data.value + '%');
            }

        }

        //switch(name){
        //
        //    case 'title-filter':{
        //
        //        if(data.path && data.value){
        //
        //            if(prevQuery.indexOf('where') !== -1){
        //                query = ' and title like ? ';
        //            }
        //            else{
        //                query = 'where title like ? ';
        //            }
        //
        //            preparedParams.push('%' + data.value + '%');
        //        }
        //    }
        //        break;
        //
        //    case 'desc-filter':{
        //
        //        if(data.path && data.value){
        //
        //            if(prevQuery.indexOf('where') !== -1){
        //                query = ' and description like ? ';
        //            }
        //            else{
        //                query = 'where description like ? ';
        //            }
        //
        //            preparedParams.push('%' + data.value + '%');
        //        }
        //    }
        //        break;
        //}
    }


};

var getTimeRange=function(status){
     var name = status.name
        ,data = status.data;
    if(name && data) {
        if (data.path && data.prev_year) {
            var start=data.prev_year+"-"+data.prev_month+"-"+data.prev_day;
            var end=data.next_year+"-"+data.next_month+"-"+data.next_day;

            return "and data between '"+start+"' and '"+end+"'";
        }
    }
    return '';
};

/**
 * get filter query
 * @param {Object} status
 * @param {string} prevQuery - prev filter query
 * @param {Array.<string>} preparedParams - array of params for prepare statement
 * @return {string}
 * status example
 * {
*     "action": "filter",
*     "name": "title-filter",
*     "type": "textbox",
*     "data": {
*         "path": ".title",
*         "ignore": "[~!@#$%^&*()+=`'\"/\\_]+",
*         "value": "",
*         "filterType": "text"
*     },
*     "cookies": true
* }
 */
var getFilterQuery = function(status,person, preparedParams){

    var query = ''
        ,name = status.name
        ,data = status.data;

    person.value='';
    console.log("person:"+person);
    if(name && data){

        switch(name){

            case 'person-filter':{

                if(data.path && data.value){

                   person.value = " and customer = ' "+data.value+" '";

                    preparedParams.push('%' + data.value + '%');
                }
            }
                break;

        }
    }

};

/**
 * get pagination query
 * @param {Object} status
 * @param {number} count - all items number (after the filters were applied)
 * @param {Array.<string>} preparedParams - array of params for prepare statement
 * @return {string}
 * status example
 * {
*     "action": "paging",
*     "name": "paging",
*     "type": "placeholder",
*     "data": {
*         "number": "10",
*         "currentPage": 0,
*         "paging": null
*     },
*     "cookies": true
* }
 */


var getPagingQuery = function(status, count, preparedParams){

    var query = ''
        ,data = status.data
        ,currentPage = 0
        ,number = 0;

    if(data){

        currentPage = Number(data.currentPage);
        number = Number(data.number);

        if(count > number){
            query = 'LIMIT ' + currentPage * number + ', ' + number;
        }
    }

    return query;
};

/**
 * entry point ----------------------------------------------------------
 * @constructor
 * @param {Array.<Object>} statuses
 * @param {Function} callback
 * @return {Object} json
 */
var jplist = function(statuses, callback){

    var json = {}
        ,query = ''
        ,status
        ,filter =''
        ,sort = ''
        ,paging = ''
        ,pagingStatus = null
        ,preparedParams = []
        ,count = 0
        ,stmt
        ,person={}
        ,doubleFilter={}
        ,time='';
    doubleFilter.infoStyleQuery='';
    doubleFilter.styleQuery='';
    doubleFilter.person='';



    console.log("==========statuses.length=======");
    console.log(statuses.length);
    for(var i=0; i<statuses.length; i++){

        //get status
        status = statuses[i];

        switch(status.action){

            case 'paging':{
                pagingStatus = status;
            }
                break;

            case 'filter':{
                console.log(status.data.path==".time");
                if(status.data.path==".time"){
                    time=getTimeRange(status);
                }
                else{
                    getDoubleFilterQuery(status,doubleFilter,preparedParams);
                }

            }
                break;

            case 'sort':{
                sort = getSortQuery(status, preparedParams);
            }
                break;
        }
    }

    console.log("==============filter===============");
    console.log(filter);

    //count database items for pagination


    query = "SELECT count(*) as count FROM report where 1=1" + ' '+ time+' '+ sort;
    if(doubleFilter.styleQuery!==''){
        query = query+' ' + doubleFilter.styleQuery;
    }
    if(doubleFilter.infoStyleQuery!==''){
        query = query+' '+doubleFilter.infoStyleQuery;
    }
    if(doubleFilter.person!==''){
        query = query+' '+doubleFilter.person;
    }



    console.log("==========query==========");
    console.log(query);

    stmt = connection.query(query, preparedParams, function(err, results){

        if(!err && _.isArray(results) && results.length > 0){
            count = results[0].count;
        }

        if(pagingStatus){
            paging = getPagingQuery(pagingStatus, count, preparedParams);
        }

        //init query with sort, filter and pagination
        query = 'SELECT * FROM report where 1=1' + ' '+time+' '+sort+ ' ' + paging;
        if(doubleFilter.styleQuery!==''){
            query =query+' '+doubleFilter.styleQuery;
        }
        if(doubleFilter.infoStyleQuery!==''){
            query = query+' '+doubleFilter.infoStyleQuery;
        }
        if(doubleFilter.person!==''){
            query = query+' '+doubleFilter.person;
        }
        console.log("==========query==========");
        console.log(query);
        stmt = connection.query(query,function(err, results){
            console.log(err);
            callback({
                count: count
                ,data: results
            });
        });
    });
};

/**
 * post request: /jplist
 */
router.post('/', function(req, res){

    var statuses = req.param('statuses', null);

    console.log("金士顿");
    if(statuses){
        statuses = JSON.parse(unescape(statuses));
        console.log(statuses);
    }

    new jplist(statuses, function(json){
        console.log("============json=============");
        console.log(json);
        res.json(json);
    });

});

module.exports = router;