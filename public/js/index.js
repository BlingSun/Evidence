/**
 * Created by SDH on 2017/6/12.
 */
$(function(){
    var winWidth=$(window).width();
    console.log("window width:"+winWidth);


    //设置滚动条
    //slidebarDom.niceScroll({cursorwidth:"2px",cursorborder:"",cursorcolor:"#ddd",boxzoom:true}); // First scrollable DIV



    //头工具条点击样式
    $(".tool-item").click(function(){
        $(".tool-item").removeClass("tool-active");
        $(this).addClass("tool-active");
    });

    //工具栏点击样式
    $(".graph-icon").click(function(){
        $(".graph-icon").css("background-color","rgba(255,255,255,0)");
        $(this).css("background-color","rgba(0,0,0,0.3)");
    });

    //滚动条滚动时显示向上箭头
    $(window).scroll(function(event){
        var wScrollY = window.scrollY; // 当前滚动条位置
        //console.log("wScrollY:"+wScrollY);
        //var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        //console.log("wInnerH:"+wInnerH);
        //var bScrollH = document.body.scrollHeight; // 滚动条总高度
        //console.log("bScrollH:"+bScrollH);
        /**
         *$(document).height():文档的高度
         *$(window).height()：可视域的高度：窗口的大小：根据浏览窗口的大小变化
         *判断底部:文档高度<=滚动条垂直高度+可视窗口的高度
         * */
        //if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        //    console.log("滚动条已经到达底部为" + $(document).scrollTop());
        //}
        //$(document).scrollTop() 获取垂直滚动的距离:最小值为0，最大值：文档高度-可视化窗口高度
        //$(document).scrollLeft() 这是获取水平滚动条的距离
        if (wScrollY>0) {
            $(".up").css("display","block");
            if(winWidth<700){
                console.log("wScrollY:"+wScrollY);
                $(".content .crumb-bar").css({"top":"0px"});
            }

        }
        else{
            $(".up").css("display","none");
            if(winWidth<700){
                $(".content .crumb-bar").css({"top":"50px"});            }


        }

    });

    //点击向上箭头滚动条向上滚动
    $(".up").click(function(){
        //scroll(0,0);
        //var t = $(window).scrollTop();
        $('body,html').animate({'scrollTop':0},300);
    });


    $(".rs").click(function(){
        $(".rs").removeClass("active");
        $(this).addClass("active");
    });
    $(".xs").click(function(){
        $(".xs").removeClass("active");
        $(this).addClass("active");
    });



});
