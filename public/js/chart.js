/**
 * Created by SDH on 2017/6/14.
 */

$(function(){
    var chart1=echarts.init(document.getElementById("chart1"));
    var option1 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'直达', selected:true},
                    {value:679, name:'营销广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '55%'],

                data:[
                    {value:335, name:'直达'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1048, name:'百度'},
                    {value:251, name:'谷歌'},
                    {value:147, name:'必应'},
                    {value:102, name:'其他'}
                ]
            }
        ]
    };
    chart1.setOption(option1);

    var chart2=echarts.init(document.getElementById("chart2"));
    var data = [
        [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
        [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
    ];

    option2 = {
        //backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        //    offset: 0,
        //    color: '#f7f8fa'
        //}, {
        //    offset: 1,
        //    color: '#cdd0d5'
        //}]),
        title: {
            text: '1990 与 2015 年各国家人均寿命与 GDP'
        },
        legend: {
            right: 10,
            data: ['1990', '2015']
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: [{
            name: '1990',
            data: data[0],
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        }, {
            name: '2015',
            data: data[1],
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }
        }]
    };
    chart2.setOption(option2);

    var chart3=echarts.init(document.getElementById("chart3"));
    option3 = {
        title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    chart3.setOption(option3);

    var chart4=echarts.init(document.getElementById("chart4"));
    option4 = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    chart4.setOption(option4);

    //地图
    var chart5 = echarts.init(document.getElementById('chart5'));
    option5 = {
        title: {
            text: '地域参与度',
            left: 'center',
            textStyle:{color:'#ddd'}
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            textStyle:{color:'#ddd'},
            orient: 'vertical',
            left: 'left',
            data:['媒体','文章','账号']
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '媒体',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value:10 },
                    {name: '天津',value: randomDataMap() },
                    {name: '上海',value: randomDataMap() },
                    {name: '重庆',value: randomDataMap() },
                    {name: '河北',value: randomDataMap() },
                    {name: '河南',value: randomDataMap() },
                    {name: '云南',value: randomDataMap() },
                    {name: '辽宁',value: randomDataMap() },
                    {name: '黑龙江',value: randomDataMap() },
                    {name: '湖南',value: randomDataMap() },
                    {name: '安徽',value: randomDataMap() },
                    {name: '山东',value: randomDataMap() },
                    {name: '新疆',value: randomDataMap() },
                    {name: '江苏',value: randomDataMap() },
                    {name: '浙江',value: randomDataMap() },
                    {name: '江西',value: randomDataMap() },
                    {name: '湖北',value: randomDataMap() },
                    {name: '广西',value: randomDataMap() },
                    {name: '甘肃',value: randomDataMap() },
                    {name: '山西',value: randomDataMap() },
                    {name: '内蒙古',value: randomDataMap() },
                    {name: '陕西',value: randomDataMap() },
                    {name: '吉林',value: randomDataMap() },
                    {name: '福建',value: randomDataMap() },
                    {name: '贵州',value: randomDataMap() },
                    {name: '广东',value: randomDataMap() },
                    {name: '青海',value: randomDataMap() },
                    {name: '西藏',value: randomDataMap() },
                    {name: '四川',value: randomDataMap() },
                    {name: '宁夏',value: randomDataMap() },
                    {name: '海南',value: randomDataMap() },
                    {name: '台湾',value: randomDataMap() },
                    {name: '香港',value: randomDataMap() },
                    {name: '澳门',value: randomDataMap() }
                ]
            },
            {
                name: '文章',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: 11 },
                    {name: '天津',value: randomDataMap() },
                    {name: '上海',value: randomDataMap() },
                    {name: '重庆',value: randomDataMap() },
                    {name: '河北',value: randomDataMap() },
                    {name: '安徽',value: randomDataMap() },
                    {name: '新疆',value: randomDataMap() },
                    {name: '浙江',value: randomDataMap() },
                    {name: '江西',value: randomDataMap() },
                    {name: '山西',value: randomDataMap() },
                    {name: '内蒙古',value: randomDataMap() },
                    {name: '吉林',value: randomDataMap() },
                    {name: '福建',value: randomDataMap() },
                    {name: '广东',value: randomDataMap() },
                    {name: '西藏',value: randomDataMap() },
                    {name: '四川',value: randomDataMap() },
                    {name: '宁夏',value: randomDataMap() },
                    {name: '香港',value: randomDataMap() },
                    {name: '澳门',value: randomDataMap() }
                ]
            },
            {
                name: '账号',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: 12 },
                    {name: '天津',value: randomDataMap() },
                    {name: '上海',value: randomDataMap() },
                    {name: '广东',value: randomDataMap() },
                    {name: '台湾',value: randomDataMap() },
                    {name: '香港',value: randomDataMap() },
                    {name: '澳门',value: randomDataMap() }
                ]
            }
        ]
    };
    chart5.setOption(option5);

    var chart6=echarts.init(document.getElementById("chart6"));
    option6 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 50, name: '完成率'}]
            }
        ]
    };
    chart6.setOption(option6);
    setInterval(function () {
        option6.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        chart6.setOption(option6, true);
    },2000);


    function randomDataMap() {
        return Math.round(Math.random()*1000);
    }



});