var time = 0;//
var treeData = '';//组织/个人树的数据
var rootId = '';//组织的根节点
var rootText = '';//组织的根节点名称
var owner = '';//
var ownerText = '';
var beginTime = ''//开始时间
var endTime = '' //结束时间

var count =  {

    //绘制表盘
    drawClock: function (){
        base.cxt.clearRect(0,0,base.circleX,base.circleY);

        //最外面的渐变圆环
        base.cxt.beginPath();
        /* 设定渐变区域 */
        var grad  = base.cxt.createRadialGradient(base.circleX,base.circleY,base.r*0.75,base.circleX,base.circleY,base.r*0.92);
        /* 设定各个位置的颜色 */
        grad.addColorStop(0,'rgba(41,97,172,.0)');
        grad.addColorStop(0.5,'rgba(77,130,190,.65)');
        grad.addColorStop(1,'rgba(24,127,195,.1)');
        base.cxt.fillStyle = grad;
        base.cxt.arc(base.circleX,base.circleY, base.r*0.92, 0, Math.PI*2);
        base.cxt.fill();
        //减去圆
        base.cxt.beginPath();
        base.cxt.fillStyle = 'rgba(255,255,255,.1)';
        base.cxt.arc(base.circleX,base.circleY, base.r*0.82, 0, Math.PI*2);
        base.cxt.fill();

        //渐变圆环上的黑色圆环
        base.cxt.strokeStyle = "rgba(0,0,0,.38)";
        base.cxt.lineWidth = "10";
        base.cxt.beginPath();
        base.cxt.arc(base.circleX,base.circleY,base.r*0.86,0,2*Math.PI);
        base.cxt.stroke();

        //渐变圆环上的黑色圆环上的蓝色圆环
        base.cxt.strokeStyle = "rgba(143,210,233,.8)";
        base.cxt.lineWidth = "6.8";
        base.cxt.beginPath();
        base.cxt.arc(base.circleX,base.circleY,base.r*0.86,0,2*Math.PI);
        base.cxt.stroke();

        //内圆的渐变环形
        base.cxt.beginPath();
        /* 设定渐变区域 */
        var grad  = base.cxt.createRadialGradient(base.circleX,base.circleY,base.r*0.7,base.circleX,base.circleY,base.r*0.7);
        /* 设定各个位置的颜色 */
        grad.addColorStop(0,'rgba(5,12,38,.0)');
        grad.addColorStop(0.5,'rgba(15,72,121,.2)');
        grad.addColorStop(1,'rgba(24,127,195,.0)');
        base.cxt.fillStyle = grad;
        base.cxt.arc(base.circleX,base.circleY, base.r*0.82, 0, Math.PI*2);
        base.cxt.fill();
        //圆中心的实心圆
        base.cxt.beginPath();
        base.cxt.fillStyle = 'rgba(15,27,58,.85)';
        base.cxt.arc(base.circleX,base.circleY, base.r*0.76, 0, Math.PI*2);
        base.cxt.fill();

        //表盘中心的地图
        //离心画布
        var into = document.createElement("canvas");
        var cxt2 = into.getContext('2d');

        into.width = base.r*0.76*2;
        into.height = base.r*0.99*2;

        var image = new Image();
        image.src = "images/eri.png";
        image.onload=function(){
            cxt2.drawImage(image,0,0,into.width,into.height);
            var pattern = base.cxt.createPattern(into, 'repeat');
            base.cxt.fillStyle = pattern;
            base.cxt.beginPath();
            // 添加圆弧
            base.cxt.arc(base.circleX, base.circleY,base.r*0.76,0,Math.PI * 2,true);
            base.cxt.closePath();
            // 设置使用位图填充作为边框颜色
            base.cxt.fill();
        }

        // 分针刻度
        var hours = ['12:00','10:00','08:00','06:00','04:00','02:00','00:00','22:00','20:00','18:00','16:00','14:00'],s = 0;

        //if(sectionTime=='month'){
        //    hours = ['周四','周三','周二','周一','周日','周六','周五'],s = 0;
        //}else{
        //    hours = ['周四','周三','周二','周一','周日','周六','周五'],s = 0;
        //}
        //文字离外圈的距离
        for(var i=0; i<120;i++){//每一个小刻度
            base.cxt.save();
            base.cxt.lineWidth=1;
            base.cxt.strokeStyle="#8fd2e9";//每一个小刻度的颜色
            base.cxt.translate(base.circleX,base.circleY);//中心
            base.cxt.rotate(i*3*Math.PI/180);
            base.cxt.beginPath();
            base.cxt.moveTo(0,-base.r);//每个小刻度的开始
            base.cxt.lineTo(0,-base.r+12);//每个小刻度的结束，开始和结束相差，就是刻度宽度
            if(i%10==0){
                base.cxt.strokeStyle = "#b5a028";//每一个大刻度黄色
                base.cxt.fillStyle = '#a1d7e3'
            }
            //if(i==0){
            //    base.cxt.lineTo(0,-r-12);//12点的指针长度
            //}

            var now = new Date();
            var hour = now.getHours();
            if(hour%2==0 && i*3==hour/2*3*10){
                base.cxt.lineTo(0,-base.r-12);//12点的指针长度
            }
            base.cxt.stroke();
            base.cxt.closePath();
            base.cxt.restore();
        }

        //表盘的刻度数字
        for(var deg = 0;deg<360;deg=deg+6){
            base.cxt.beginPath();
            base.cxt.fillStyle = '#acdbe5';
            if(deg%30==0){
                var textX =(base.r*1.09)*Math.sin(deg*2*Math.PI/360); //文字x坐标
                var textY =(base.r*1.09)*Math.cos(deg*2*Math.PI/360); //文字y坐标
                var now = new Date();
                var hour = now.getHours();
                if(hour==hours[s]){
                    base.cxt.font = "28px Arial";
                }else{
                    base.cxt.font = "18px Arial";
                }
                base.cxt.textBaseline = "middle";// 文字垂直对齐方式
                base.cxt.textAlign = "center";   // 文字水平对齐方式
                base.cxt.fillText(hours[s],textX+base.circleX,textY+base.circleY);
                s++;
            }
            base.cxt.closePath();
        }

        /*圆外面的矩形框数据*/
        //刻度2对应的
        var line1X = base.r*0.86*Math.sin(240*Math.PI/360);
        var line1Y = base.r*0.86*Math.cos(240*Math.PI/360);
        base.cxt.beginPath();
        base.cxt.moveTo(line1X+base.circleX,base.circleY+line1Y);
        base.cxt.lineTo(base.r*1.25*Math.sin(260*Math.PI/360)+base.circleX,base.r*1.25*Math.cos(260*Math.PI/360)+base.circleY);
        base.cxt.lineTo(base.r*1.75*Math.sin(260*Math.PI/360)+base.circleX,base.r*1.25*Math.cos(260*Math.PI/360)+base.circleY);
        base.cxt.lineWidth = 1;
        base.cxt.strokeStyle = "#8fd2e9";
        base.cxt.stroke();
        base.cxt.closePath();

        //刻度4对应的
        var line2X = base.r*0.86*Math.sin(90*Math.PI/360);
        var line2Y = base.r*0.86*Math.cos(90*Math.PI/360);
        base.cxt.beginPath();
        base.cxt.moveTo(line2X+base.circleX,line2Y+base.circleY);
        base.cxt.lineTo(base.r*1.3*Math.sin(100*Math.PI/360)+base.circleX,base.r*0.93*Math.cos(100*Math.PI/360)+base.circleY);
        base.cxt.lineTo(base.r*1.5*Math.sin(100*Math.PI/360)+base.circleX,base.r*1.1*Math.cos(100*Math.PI/360)+base.circleY);
        base.cxt.lineWidth = 1;
        base.cxt.strokeStyle = "#8fd2e9";
        base.cxt.stroke();

        //刻度8对应的
        var line3X = base.r*0.86*Math.sin(-110*Math.PI/360);
        var line3Y = base.r*0.86*Math.cos(-110*Math.PI/360);
        base.cxt.beginPath();
        base.cxt.moveTo(line3X+base.circleX,line3Y+base.circleY);
        base.cxt.lineTo(base.r*1.2*Math.sin(-90*Math.PI/360)+base.circleX,base.r*1.1*Math.cos(-90*Math.PI/360)+base.circleY);
        base.cxt.lineTo(base.r*1.8*Math.sin(-90*Math.PI/360)+base.circleX,base.r*1.1*Math.cos(-90*Math.PI/360)+base.circleY);
        base.cxt.lineWidth = 1;
        base.cxt.strokeStyle = "#8fd2e9";
        base.cxt.stroke();

        //刻度10对应的
        var line4X = base.r*0.86*Math.sin(-240*Math.PI/360);
        var line4Y = base.r*0.86*Math.cos(-240*Math.PI/360);
        base.cxt.beginPath();
        base.cxt.moveTo(line4X+base.circleX,line4Y+base.circleY);
        base.cxt.lineTo(base.r*1.2*Math.sin(-260*Math.PI/360)+base.circleX,base.r*1.1*Math.cos(-260*Math.PI/360)+base.circleY);
        base.cxt.lineTo(base.r*1.6*Math.sin(-260*Math.PI/360)+base.circleX,base.r*1.1*Math.cos(-260*Math.PI/360)+base.circleY);
        base.cxt.lineWidth = 1;
        base.cxt.strokeStyle = "#8fd2e9";
        base.cxt.stroke();

        /*对应的矩形框数据*/

        base.cxt.beginPath();
        //1.安装应用
        base.cxt.rect(base.r*1.75*Math.sin(260*Math.PI/360)+base.circleX,base.r*1.25*Math.cos(260*Math.PI/360)+base.circleY-base.rectHeight*0.5,base.rectWidth,base.rectHeight);
        //2.违规行为
        base.cxt.rect(base.r*1.5*Math.sin(100*Math.PI/360)+base.circleX-base.rectWidth*0.5,base.r*1.1*Math.cos(100*Math.PI/360)+base.circleY,base.rectWidth,base.rectHeight);
        //3.拦截网址
        base.cxt.rect(base.r*1.8*Math.sin(-90*Math.PI/360)+base.circleX-base.rectWidth,base.r*1.1*Math.cos(-90*Math.PI/360)+base.circleY-base.rectHeight*0.5,base.rectWidth,base.rectHeight);
        //4.敏感词
        base.cxt.rect(base.r*1.6*Math.sin(-260*Math.PI/360)+base.circleX-base.rectWidth,base.r*1.1*Math.cos(-260*Math.PI/360)+base.circleY-base.rectHeight*0.5,base.rectWidth,base.rectHeight);
        //矩形框的背景色
        base.cxt.fillStyle = 'rgba(18,39,76,0.8)';
        base.cxt.fill();
        base.cxt.closePath();
        //绘制中间的数据
        count.requestData();

    },

    //表盘的数据
    requestData: function(unit){
        $.ajax({
            url:base_url+'emm/dv/totalInfoStatics',
            beginTime:beginTime,
            endTime:endTime,
            owner:owner,
            unit:unit,
            success:function(result){
                if(result) {
                    var res = JSON.parse(result);
                    var data = res.data;
                    count.clockDataFn(data);
                }
            }
        })
    },

    //绘制表盘数据
    clockDataFn: function (data){
        //现在的时间

        base.contextData.clearRect(0,0,clockData.width,clockData.height);
        base.contextData.save();
        base.contextData.beginPath();
        //圆中间的文字"2,000"
        base.contextData.fillStyle = '#acdbe5';
        base.contextData.font="100px Arial";
        base.contextData.textAlign = "center";   // 文字水平对齐方式
        base.contextData.fillText(data.deviceCount,base.circleX,base.circleY-30);
        //"设备行为监测"
        base.contextData.fillStyle = '#acdbe5';
        base.contextData.font="40px Arial";
        base.contextData.textAlign = "center";   // 文字水平对齐方式
        base.contextData.fillText("设备行为监测",base.circleX,base.circleY+40);

        //" 2017.8.25 AM12:00"
        base.contextData.fillStyle = '#acdbe5';
        base.contextData.font="18px Arial";
        base.contextData.textAlign = "center";   // 文字水平对齐方式
        base.contextData.fillText(count.nowDateTime()[0],base.circleX,base.circleY+90);

        /*矩形里面的文字*/
        /*矩形框上的数据*/
        base.contextData.font = '24px Arial';
        base.contextData.fillStyle = "#acdbe5";//大文字的颜色
        //1.安装应用
        base.contextData.fillText(data.installedApp,base.r*1.75*Math.sin(260*Math.PI/360)+base.circleX+base.rectWidth*0.5,base.r*1.25*Math.cos(260*Math.PI/360)+base.circleY-base.rectHeight*0.1);
        //2.违规行为
        base.contextData.fillText(data.invalidBehaviour,(base.r*1.5*Math.sin(100*Math.PI/360)+base.circleX),base.r*1.2*Math.cos(100*Math.PI/360)+base.circleY+base.rectHeight*0.2);
        //3.拦截网址
        base.contextData.fillText(data.interceptUrl,base.r*1.8*Math.sin(-90*Math.PI/360)+base.circleX-base.rectWidth*0.5,base.r*1.1*Math.cos(-90*Math.PI/360)+base.circleY-base.rectHeight*0.1);
        //4.敏感词
        base.contextData.fillText(data.sensitiveWord,base.r*1.6*Math.sin(-260*Math.PI/360)+base.circleX-base.rectWidth*0.5,base.r*1.1*Math.cos(-260*Math.PI/360)+base.circleY-base.rectHeight*0.1);
        base.contextData.font = '16px Arial';
        /*矩形框下部分的文字*/
        base.contextData.fillText('安装应用',base.r*1.75*Math.sin(260*Math.PI/360)+base.circleX+base.rectWidth*0.5,base.r*1.25*Math.cos(260*Math.PI/360)+base.circleY+base.rectHeight*0.2);
        base.contextData.fillText('违规行为',base.r*1.5*Math.sin(100*Math.PI/360)+base.circleX,base.r*1.2*Math.cos(100*Math.PI/360)+base.circleY+base.rectHeight*0.5);
        base.contextData.fillText('拦截网址',base.r*1.8*Math.sin(-90*Math.PI/360)+base.circleX-base.rectWidth*0.5,base.r*1.1*Math.cos(-90*Math.PI/360)+base.circleY+base.rectHeight*0.2);
        base.contextData.fillText('敏感词',base.r*1.6*Math.sin(-260*Math.PI/360)+base.circleX-base.rectWidth*0.5,base.r*1.1*Math.cos(-260*Math.PI/360)+base.circleY+base.rectHeight*0.2);
        base.contextData.fill();
        base.contextData.closePath();
        base.contextData.restore();
        time++
    },

    //获取现在的时间
    nowDateTime:function(){
        var now = new Date();
        // 定义时间
        var year = now.getFullYear();   //获取系统的年；
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour = now.getHours();
        var min =now.getMinutes();
        var dn="AM";
        if (hour>12){
            dn="PM";
            hour=hour-12;
        }
        if (hour==0) hour=12;

        var nowTime = year+'.'+month+'.'+day+' '+ dn + ' '+hour+':'+min;
        var nowDate = year+'-'+month+'-'+day;
        if(arguments[0] == 'day'){
            day = now.getDate()-1;
            var selsectDate = year+'-'+month+'-'+day;
        }else if(arguments[0] == 'week'){
            day = now.getDate()-7;
            var selsectDate = year+'-'+month+'-'+day;
        }else if(arguments[0] == 'month'){
            month = now.getMonth();
            var selsectDate = year+'-'+month+'-'+day;
        }
        return [nowTime,nowDate,selsectDate];
    },

    //表盘转圈的动画
    runClock:function(){
        base.context.clearRect(0,0,animateClock.width,animateClock.height);
        base.context.save();
        base.context.translate(base.circleX,base.circleY);//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
        base.context.rotate(time*8*Math.PI/180);//设定每次旋转的度数
        base.context.beginPath();

        base.context.moveTo(15,base.r*0.86);
        base.context.lineTo(-15,base.r*0.89);
        base.context.arc(-15,base.r*0.86,base.r*0.03,0.5*Math.PI,1.5*Math.PI);//半径=折线的终点-线的起点base.r*0.02 = base.r*0.88-base.r*0.86
        base.context.closePath();
        base.context.fillStyle = "rgba(143,210,233,0.8)";
        base.context.fill();
        base.context.restore();
        time+=1;
    },

    //选择日月年
    selectTimeStyle:function(){
        $('.setting-time li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            var unit = $(this).attr('cid');
            //var unit = count.nowDateTime(units)[2]

            initOrgUser(unit);
        })

        //$('.select-time li').click(function(){
        //    $(this).children('div').addClass('active');
        //    $(this).siblings().children('div').removeClass('active');
        //    var fn = $(this).parent().parent().attr('id');
        //    if(fn=='illegalBehavior'){
        //        count.illegalBehavior($(this).children('input').val());//违规行为
        //    }else if(fn=='callRecords'){
        //        count.callRecords($(this).children('input').val());//通话纪录
        //    }
        //
        //})
    },

    //拦截敏感词
    sensitiveWord: function(unit){
        debugger;
        var sensitive = document.getElementById('sensitive');

        sensitive.style.width = $('.left-main1').width()+'px';
        sensitive.style.height = $('.left-main1').height()+'px';
   console.log($('.left-main1').width(),$('.left-main1').height())
        var myChartSensitive= echarts.init(sensitive);

        myChartSensitive.showLoading({
            text: '数据加载中',
            color: 'rgba(75,189,203,1)',
            textColor: 'rgba(75,189,203,1)',
            maskColor: 'rgba(18,39,76,0.8)',
            zlevel: 0
        });
        $.ajax({
            url:base_url+'emm/dv/sensitiveWordStatics',
            data:{
                beginTime:beginTime,
                endTime:endTime,
                owner:owner,
                unit:unit
            },
            success:function(result){
                myChartSensitive.hideLoading();
                if(result){
                    var res = JSON.parse(result);
                    var data = res.data;
                    data.sort(function(a, b) {
                        return a.value - b.value;
                    })
                    //名称
                    var categoryData = [];
                    //柱形数据
                    var barData = [];
                    //渐变色
                    var colorList = [];
                    for (var i = 0; i < data.length; i++) {
                        categoryData.push(data[i].name);
                        barData.push(data[i].value);
                        var j = i+1;
                        var opacity = j/data.length;
                        colorList.push('rgba(211,178,45,'+opacity+')');
                    }
                    //设置
                    option = {
                        animation: true,
                        animationDuration: 1000,
                        animationEasing: 'cubicInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'cubicInOut',
                        tooltip: {
                            trigger: 'item',
                            position: 'top',
                            padding: [5, 10],
                            formatter: function(params) {
                                return '<span style="display:inline-block;position:relative;margin-right:10px;border-color:'+ params.color +';border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>'+categoryData[params.dataIndex]+'：'+params.value;
                            },
                            textStyle:{
                                width:300,
                                lineHeight:18
                            }
                        },
                        title: {
                            id: 'statistic',
                            text: '拦截敏感词 TOP10',
                            left: 10,
                            top: 10,
                            textStyle: {
                                color: 'rgba(75,189,203,1)',
                                fontSize: 22,
                                fontWeight:'normal'
                            }
                        },
                        //整个图距外框的距离
                        grid: {
                            left: 70,
                            top: 80,
                            bottom: 30
                        },
                        xAxis: {
                            type: 'value',
                            scale: true,
                            position: 'top',
                            boundaryGap: false,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                margin: 2,
                                textStyle: {
                                    color: 'rgb(62,172,205)'
                                }
                            }
                        },
                        yAxis: {
                            type: 'category',
                            nameGap: 16,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(62,172,205,1)'
                                }
                            },
                            axisTick: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(62,172,205,1)'
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                rotate:20,
                                textStyle: {
                                    color: 'rgba(62,172,205,1)',
                                    fontSize:14
                                }
                            },
                            data: categoryData
                        },
                        series: [ //柱形
                            {
                                id: 'bar',
                                zlevel: 1,
                                type: 'bar',
                                barCategoryGap: '20',//柱间的距离
                                symbol: 'none',
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                },
                                data: barData
                            }]
                    };
                    myChartSensitive.clear();
                    myChartSensitive.setOption(option);
                }
            },
            error:function(errorMsg){
                myChartSensitive.showLoading({
                    text: '数据加载失败，请联系管理员',
                    color: 'rgba(75,189,203,0)',
                    textColor: 'rgba(75,189,203,1)',
                    maskColor: 'rgba(18,39,76,0.8)',
                    zlevel: 0
                });
                //myChartSensitive.hideLoading();
            }
        })
    },

    //拦截网址
    holdUrl:function(unit){
        var myChartUrl= echarts.init(document.getElementById('hold-url'));
        myChartUrl.showLoading({
            text: '数据加载中',
            color: 'rgba(75,189,203,1)',
            textColor: 'rgba(75,189,203,1)',
            maskColor: 'rgba(18,39,76,0.8)',
            zlevel: 0
        });

        $.ajax({
            url:base_url+'emm/dv/interceptUrlStatics',
            data:{
                beginTime:beginTime,
                endTime:endTime,
                owner:owner,
                unit:unit
            },
            success:function(result){
                myChartUrl.hideLoading();
                if(result){
                    var res = JSON.parse(result);
                    var data = res.data;
                    //渐变色
                    var colorList = [];

                    for (var i = 0; i < data.length; i++) {
                        data[i].selected = true;//为了饼图有间距，在数组的object加入selected:true
                        var j = i+1;
                        var opacity = j/data.length;
                        colorList.push('rgba(211,178,45,'+opacity+')');
                    }
                    option = {
                        title: {
                            id: 'statistic',
                            text: '拦截网址 TOP10',
                            left: 10,
                            top: 10,
                            textStyle: {
                                color: 'rgba(75,189,203,1)',
                                fontSize: 22,
                                fontWeight:'normal'
                            }
                        },
                        tooltip : {
                            trigger: 'item',
                            position: 'top',
                            padding: [5, 10],
                            formatter: function(params) {
                                return '<span style="display:inline-block;position:relative;margin-right:10px;border-color:'+ params.color +';border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>'+params.data.name+'：'+params.value;
                            }

                        },
                        calculable : false,
                        series :
                            [{
                                name:'拦截网址',
                                type:'pie',
                                radius : [40, 60],//控制饼图的大小

                                // for funnel
                                x: '60%',
                                width: '35%',
                                funnelAlign: 'left',
                                //max: 1048,
                                itemStyle: {
                                    normal: {
                                        labelLine : {
                                            show : true
                                        }
                                    }
                                },
                                label:{
                                    normal:{
                                        fontSize: 14
                                    }
                                },
                                color: ['#cb7a9a', '#cb533e', '#d97a13', '#e8c11a', '#89539d','#3c8ccc','#4db462','#34b9cd','#32479a','#51298a'],
                                data:data
                            },
                                {
                                    name:'拦截网址',
                                    type:'pie',
                                    radius : [30, 40],//控制饼图的大小

                                    // for funnel
                                    x: '60%',
                                    width: '35%',
                                    funnelAlign: 'left',
                                    //max: 1048,
                                    itemStyle: {
                                        normal: {
                                            opacity:0.4,
                                            label : {
                                                show : false
                                            },
                                            labelLine : {
                                                show : false
                                            }
                                        }
                                    },
                                    color: ['#cb7a9a', '#cb533e', '#d97a13', '#e8c11a', '#89539d','#3c8ccc','#4db462','#34b9cd','#32479a','#51298a'],
                                    data:data
                                },
                            ]

                    };
                    myChartUrl.clear();
                    myChartUrl.setOption(option);
                }
            },
            error:function(errorMsg){
                myChartUrl.showLoading({
                    text: '数据加载失败，请联系管理员',
                    color: 'rgba(75,189,203,0)',
                    textColor: 'rgba(75,189,203,1)',
                    maskColor: 'rgba(18,39,76,0.8)',
                    zlevel: 0
                });
            }
        })
    },

    //安装应用
    installApp:function(unit){
        var myChartInstall= echarts.init(document.getElementById('install-app'));
        //加载动画
        myChartInstall.showLoading({
            text: '数据加载中',
            color: 'rgba(75,189,203,1)',
            textColor: 'rgba(75,189,203,1)',
            maskColor: 'rgba(18,39,76,0.8)',
            zlevel: 0
        });
        /*千次*/
        $.ajax({
            url:base_url+'emm/dv/appInstallStatics',
            data:{
                beginTime:beginTime,
                endTime:endTime,
                owner:owner,
                unit:unit
            },
            success:function(result){
                myChartInstall.hideLoading();
                if(result){
                    var res = JSON.parse(result);
                    var data = res.data;
                    //名称,两组数据用一个名称
                    var myData = [];
                    //千次的数据
                    var valueData = [];
                    //千次的渐变色
                    var colorList = [];
                    for (var i = 0; i < data.length; i++) {
                        myData.push(data[i].name);
                        valueData.push(data[i].value);
                        var j = i+1;
                        var opacity = j/data.length;
                        colorList.unshift('rgba(203,83,62,'+opacity+')');
                    }
                    /*小时*/
                    $.ajax({
                        url:base_url+'emm/dv/appUsingTimeStatics',
                        data:{
                            beginTime:beginTime,
                            endTime:endTime,
                            owner:owner,
                            unit:unit
                        },
                        success:function(res){
                            if(res){
                                var timeData = JSON.parse(res).data;
                                //小时数据
                                var timeDataArr = [];
                                //小时渐变色
                                var colorListTime = [];

                                for (var i = 0; i < timeData.length; i++) {
                                    timeDataArr.push(timeData[i].value);
                                    var j = i+1;
                                    var opacity = j/timeData.length;
                                    colorListTime.unshift('rgba(66,172,205,'+opacity+')');



                                }

                                option = {
                                    tooltip: {
                                        position: 'top',
                                        padding: [5, 10],
                                        formatter: function(params) {
                                            return '<span style="display:inline-block;position:relative;margin-right:10px;border-color:'+ params.color +';border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>'+myData[params.dataIndex]+'：'+params.value;
                                        },
                                        textStyle:{
                                            width:300,
                                            lineHeight:18
                                        }
                                    },
                                    title: {
                                        text: '安装应用 TOP10',
                                        left: 10,
                                        top: 10,
                                        textStyle: {
                                            color: 'rgba(75,189,203,1)',
                                            fontSize: 22,
                                            fontWeight:'normal'
                                        }
                                    },
                                    legend: {
                                        x: 'center',
                                        left:200,
                                        top:10,
                                        textStyle: {
                                            color: 'rgba(62,172,205,1)',
                                            fontSize:16,
                                            fontWeight:'normal'
                                        },
                                        data: ['千次', '小时']//必须与下面series里面的name对应才显示
                                    },
                                    grid: [{
                                        show: false,
                                        left: '12%',
                                        top: 60,
                                        bottom: 20,
                                        containLabel: true,
                                        width: '43%'
                                    }, {
                                        show: false,
                                        left: '56%',
                                        top: 60,
                                        bottom: 40,
                                        width: '5%'
                                    }, {
                                        show: false,
                                        right: '14%',
                                        top: 60,
                                        bottom: 20,
                                        containLabel: true,
                                        width: '46%'
                                    }, ],
                                    xAxis: [{
                                        splitNumber: 4,
                                        name: '千次',
                                        nameTextStyle:{
                                            fontSize:14,
                                            fontWeight:'normal'
                                        },
                                        type: 'value',
                                        inverse: true,
                                        axisLine: {
                                            show: true,
                                            lineStyle: {
                                                color: 'rgba(62,172,205,1)'
                                            }
                                        },
                                        axisTick: {
                                            show: true

                                        },
                                        position: 'bottom',
                                        axisLabel: {
                                            show: true,
                                            formatter: '{value}',
                                            textStyle: {
                                                color: 'rgba(62,172,205,1)',
                                                fontSize:14,
                                                fontWeight:'normal'
                                            }
                                        },
                                        splitLine: {
                                            show: false,
                                            lineStyle: {
                                                width: 0
                                            }
                                        }
                                    }, {
                                        gridIndex: 1,
                                        show: false
                                    }, {
                                        gridIndex: 2,
                                        splitNumber: 4,
                                        type: 'value',
                                        name: '小时',
                                        nameTextStyle:{
                                            fontSize:14,
                                            fontWeight:'normal'
                                        },
                                        axisLine: {
                                            show: true,
                                            lineStyle: {
                                                color: 'rgba(62,172,205,1)'
                                            }
                                        },
                                        axisTick: {
                                            show: true
                                        },
                                        position: 'bottom',
                                        axisLabel: {
                                            show: true,
                                            textStyle: {
                                                color: 'rgba(62,172,205,1)',
                                                fontSize:14,
                                                fontWeight:'normal'
                                            },
                                            formatter: '{value}'
                                        },
                                        splitLine: {
                                            show: false,
                                            lineStyle: {
                                                width: 0
                                            }
                                        }
                                    }
                                    ],
                                    yAxis: [
                                        //左边的标尺
                                        {
                                            type: 'category',
                                            inverse: true,
                                            position: 'right',
                                            axisLine: {
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            },
                                            axisTick: {
                                                show: true
                                            },
                                            axisLabel: {
                                                show: true
                                            },
                                            data: myData.map(function(value,index) {
                                                return {
                                                    value: index+1,
                                                    textStyle: {
                                                        align: 'left',
                                                        color:'rgba(62,172,205,1)',
                                                        fontSize:14,
                                                        fontWeight:'normal'


                                                    }
                                                }
                                            })
                                        },
                                        //中间的标尺
                                        {
                                            gridIndex: 1,
                                            type: 'category',
                                            inverse: true,
                                            position: 'left',
                                            axisLine: {
                                                show: true,
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            },
                                            axisTick: {
                                                show: true,
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            },
                                            axisLabel: {
                                                show: false
                                            },

                                            data: myData.map(function(value,index) {
                                                return {
                                                    value: index+1,
                                                    textStyle: {
                                                        align: 'right',
                                                        color:'rgba(62,172,205,1)',
                                                        fontSize:14,
                                                        fontWeight:'normal'

                                                    }
                                                }
                                            })
                                        },
                                        //右边的标尺
                                        {
                                            gridIndex: 2,
                                            type: 'category',
                                            inverse: true,
                                            position: 'left',
                                            axisLine: {
                                                show: false
                                            },
                                            axisTick: {
                                                show: false
                                            },
                                            axisLabel: {
                                                show: false
                                            },
                                            data: []
                                        }
                                    ],
                                    series: [{
                                        name: '千次',
                                        type: 'bar',
                                        barGap: 20,
                                        barWidth: '42%',
                                        label: {
                                            normal: {
                                                show: true,
                                                color: 'red',
                                                position: 'left',
                                                formatter:function(params){
                                                    var arr = [];
                                                    myData.forEach(function(value) {
                                                        return arr.push(value)
                                                    })
                                                    return arr[params.dataIndex];

                                                },
                                                textStyle: {
                                                    color: 'rgba(62,172,205,1)',
                                                    fontSize:14,
                                                    fontWeight:'normal'
                                                }

                                            },
                                            emphasis: {
                                                show: false
                                            }

                                        },
                                        itemStyle: {
                                            normal: {
                                                color: function(params){
                                                    return colorList[params.dataIndex]
                                                }
                                            },
                                            emphasis: {
                                                show: false
                                            }
                                        },
                                        data: valueData
                                    }, {
                                        name: '小时',
                                        type: 'bar',
                                        barGap: 20,
                                        barWidth: '42%',
                                        xAxisIndex: 2,
                                        yAxisIndex: 2,
                                        label: {
                                            normal: {
                                                show: true,
                                                color: 'red',
                                                position: 'right',
                                                textStyle: {
                                                    color: 'rgba(62,172,205,1)',
                                                    fontSize:14,
                                                    fontWeight:'normal'
                                                },
                                                formatter:function(params){
                                                    var arr = [];
                                                    myData.forEach(function(value) {
                                                        return arr.push(value)
                                                    })
                                                    return arr[params.dataIndex];

                                                }
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: function(params){
                                                    var colorListTimes = ['#42accd','#3b9bc1','#3398db8','#3880b4','#3880b4','#3375af','#165294','#113f7d','#113674','#142a51']
                                                    return colorListTimes[params.dataIndex]
                                                }
                                            },
                                            emphasis: {
                                                show: false
                                            }
                                        },
                                        data: timeDataArr
                                    }]
                                };
                                myChartInstall.clear();
                                myChartInstall.setOption(option);
                            }
                        }
                    })
                }
            },
            error:function(errorMsg){
                myChartInstall.showLoading({
                    text: '数据加载失败，请联系管理员',
                    color: 'rgba(75,189,203,0)',
                    textColor: 'rgba(75,189,203,1)',
                    maskColor: 'rgba(18,39,76,0.8)',
                    zlevel: 0
                });
            }
        })
    },

    //违规行为
    illegalBehavior:function(unit){
        var myChartIllegal= echarts.init(document.getElementById('illegal-behavior'));
        myChartIllegal.showLoading({
            text: '数据加载中',
            color: 'rgba(75,189,203,1)',
            textColor: 'rgba(75,189,203,1)',
            maskColor: 'rgba(18,39,76,0.8)',
            zlevel: 0
        });

        $.ajax({
            url:base_url+'emm/dv/invalidBehaviourStatics',
            data:{
                beginTime:beginTime,
                endTime:endTime,
                owner:owner,
                unit:unit
            },
            success:function(result){
                myChartIllegal.hideLoading();
                if(result){
                    var res = JSON.parse(result);
                    var val = res.data.val;

                    //名称
                    var catName = res.data.cat;
                    //数据
                    var data = [];
                    //时间
                    var hours = [];
                    var arr = [];
                    for (var i = 0; i < val.length; i++) {
                        hours.push(val[i].time+':00');
                        arr.push(val[i].value);
                    }

                    hours.forEach(function(ele,i){
                        catName.forEach(function(ele,j){
                            var arr1 = [];
                            arr1.push(j,i,arr[i][j]/100);
                            data.push(arr1);
                        })
                    })

                    option = {
                        tooltip: {
                            position: 'top',
                            padding: [5, 10],
                            formatter: function(params) {
                                return '<span style="display:inline-block;position:relative;margin-right:10px;border-color:'+ params.color +';border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>'+params.name+'<br>'+params.seriesName+':'+params.value[1]*100;
                            },
                            textStyle:{
                                width:300,
                                lineHeight:18
                            }
                        },
                        title: [
                            {
                                id: 'statistic',
                                text: '违规行为',
                                left: 10,
                                top: 10,
                                textStyle: {
                                    color: 'rgba(75,189,203,1)',
                                    fontSize: 22,
                                    fontWeight:'normal'
                                }
                            }
                        ],
                        //legend是显示，必须有对应的series的name对应
                        legend: {
                            data:catName,
                            x: 'center',
                            left:150,
                            top:10,
                            textStyle: {
                                color: 'rgba(62,172,205,1)',
                                fontSize:18,
                                fontWeight:'normal'
                            }
                        },

                        singleAxis: [],
                        series: []
                    };

                    echarts.util.each(catName, function(day, idx) {
                        option.title.push({
                            left: 20,
                            textBaseline: 'middle',
                            textStyle: {
                                color: 'rgba(62,172,205,1)',
                                fontSize:'18',
                                fontWeight:'normal'
                            },
                            top: idx==0?base.mainH*0.34*0.3*1.2:(idx==1?base.mainH*0.34*0.3*1.9:base.mainH*0.34*0.3*2.7),//设置字的间距
                            text: day
                        });
                        option.singleAxis.push({
                            left: 180,
                            type: 'category',
                            boundaryGap: false,
                            data: hours,
                            top: idx==0?base.mainH*0.34*0.3*0.4:(idx==1?base.mainH*0.34*0.3*1.2:base.mainH*0.34*0.3*1.9),
                            height: (80 / 3 ) + '%',//设置坐标的间距
                            axisLabel: {
                                interval: 1
                            },
                            axisLine: {
                                lineWidth:1,
                                lineStyle: {
                                    color: 'rgba(82,166,169,.65)'
                                }
                            },
                            splitLine:{
                                show:false,//底部网格线不显示
                                lineStyle:{
                                    width:0
                                }
                            }
                        });
                        option.series.push({
                            name:day,
                            singleAxisIndex: idx,
                            coordinateSystem: 'singleAxis',
                            type: 'scatter',
                            data: [],
                            itemStyle:{
                                normal:{
                                    color:function(){
                                        var colorList = ['rgba(166,141,26,.8)','rgba(43,90,62,.8)','rgba(45,87,92,.8)'];
                                        return colorList[idx];
                                    }
                                }
                            },
                            //symbolSize标记的大小
                            symbolSize: function(dataItem) {
                                return dataItem[1] * 4;
                            }
                        });
                    });

                    echarts.util.each(data, function(dataItem) {
                        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
                    });

                    myChartIllegal.clear();
                    myChartIllegal.setOption(option);
                }
            },
            error:function(errorMsg){
                myChartIllegal.showLoading({
                    text: '数据加载失败，请联系管理员',
                    color: 'rgba(75,189,203,0)',
                    textColor: 'rgba(75,189,203,1)',
                    maskColor: 'rgba(18,39,76,0.8)',
                    zlevel: 0
                });
            }
        })
    },

    //流量监控
    flowMonitoring:function(unit){
        var myChartFlow= echarts.init(document.getElementById('flow-monitoring'));
            myChartFlow.showLoading({
                text: '数据加载中',
                color: 'rgba(75,189,203,1)',
                textColor: 'rgba(75,189,203,1)',
                maskColor: 'rgba(18,39,76,0.8)',
                zlevel: 0
            });

            $.ajax({
                url:base_url+'emm/dv/deviceFlowStatics',
                data:{
                    beginTime:beginTime,
                    endTime:endTime,
                    owner:owner,
                    unit:unit
                },
                success:function(result){
                    myChartFlow.hideLoading();
                    if(result){
                        var res = JSON.parse(result);
                        var data = res.data;
                        //名称
                        var categoryData = ['用户设备流量','应用流量'];
                        //数据
                        $.ajax({
                            url:base_url+'emm/dv/appFlowStatics',
                            data:{
                                beginTime:beginTime,
                                endTime:endTime,
                                owner:owner,
                                unit:unit
                            },
                            success:function(result){
                                if(result){
                                    var res = JSON.parse(result);
                                    var appData = res.data;
                                    var valueData = [];
                                    var r = 90;//圆半径
                                    var colors = 1;//透明度
                                    var lineLength =  40;
                                    var placeHolderStyle = {
                                        normal : {
                                            color: 'rgba(0,0,0,0)',
                                            label: {show:false},
                                            labelLine: {show:false}
                                        },
                                        emphasis : {
                                            show: false,
                                            color: 'rgba(0,0,0,0)'
                                        }
                                    };
                                    for (var i = 0; i < data.length; i++) {
                                            var radiusM = r-3;
                                            var radiusS = r;
                                            var rMm = r-6;
                                        valueData.push({
                                            name: categoryData[0],
                                            type : "pie",
                                            clockWise: false,
                                            radius: [radiusS, radiusM],
                                            center: ['50%', '60%'],
                                            label: {
                                                show:true,
                                                normal:{
                                                    color:'rgba(118,64,204,1)'
                                                }

                                            },
                                            labelLine: {
                                                show:true,
                                                normal:{
                                                    length: lineLength,
                                                    smooth: 0.5
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color:'rgba(118,64,204,'+colors+')',
                                                    shadowBlur: 10,
                                                    shadowColor: 'rgba(40, 40, 40, 0.5)'
                                                }
                                            },
                                            hoverAnimation: false,
                                            data:[{
                                                value : data[i].value,
                                                name : data[i].name
                                            },{
                                                value: appData[i].value,
                                                name: appData[i].name,
                                                itemStyle: placeHolderStyle
                                            }]
                                        },{
                                                name:categoryData[1],
                                                type:'pie',
                                                clockWise:false,
                                                radius : [radiusM,rMm],
                                                center: ['50%', '60%'],
                                                label: {
                                                    show:true,
                                                    normal:{
                                                        color:'rgba(100,188,226,1)'
                                                    }

                                                },
                                                labelLine: {
                                                    show:true,
                                                    normal:{
                                                        length: lineLength,
                                                        smooth: 0.5
                                                    }

                                                },
                                                itemStyle : {
                                                    normal: {

                                                        color:'rgba(100,188,226,'+colors+')',
                                                        shadowBlur: 10,
                                                        shadowColor: 'rgba(40, 40, 40, 0.5)'
                                                    }
                                                },
                                                hoverAnimation: false,

                                                data:[{
                                                    value : data[i].value,
                                                    name : data[i].name,
                                                    itemStyle: placeHolderStyle
                                                },{
                                                    value: appData[i].value,
                                                    name: appData[i].name

                                                }]
                                            }

                                        );
                                        r = r-6;
                                        colors = colors-0.1;
                                        lineLength = lineLength + 5;
                                    };


                                    option = {
                                        title: {
                                            id: 'statistic',
                                            text: '流量监控 TOP10',
                                            left: 10,
                                            top: 10,
                                            textStyle: {
                                                color: 'rgba(75,189,203,1)',
                                                fontSize: 22,
                                                fontWeight:'normal'
                                            }
                                        },
                                        color: ['#7640cc', "#64bce2"],
                                        tooltip : {
                                            show: true,
                                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                                        },
                                        legend: {
                                            itemGap:12,
                                            x: 'left',
                                            left:10,
                                            top:40,
                                            textStyle: {
                                                color: 'rgba(62,172,205,1)',
                                                fontSize:16,
                                                fontWeight:'normal'
                                            },
                                            data:['用户设备流量','应用流量']
                                        },
                                        series : valueData
                                    };
                                    myChartFlow.clear();
                                    myChartFlow.setOption(option);

                                }
                            }
                        })
                    }
                },
                error:function(errorMsg){
                    myChartFlow.showLoading({
                        text: '数据加载失败，请联系管理员',
                        color: 'rgba(75,189,203,0)',
                        textColor: 'rgba(75,189,203,1)',
                        maskColor: 'rgba(18,39,76,0.8)',
                        zlevel: 0
                    });
                }
            })
    },

    //通话纪录
    callRecords:function(unit){
        var myChartCall= echarts.init(document.getElementById('call-records'));
        myChartCall.showLoading({
            text: '数据加载中',
            color: 'rgba(75,189,203,1)',
            textColor: 'rgba(75,189,203,1)',
            maskColor: 'rgba(18,39,76,0.8)',
            zlevel: 0
        });
        //第一个通话纪录
        $.ajax({
            url:base_url+'emm/dv/callTimeStatics',
            data:{
                beginTime:beginTime,
                endTime:endTime,
                owner:owner,
                unit:unit
            },
            success:function(result){
                myChartCall.hideLoading();
                if(result){
                    var res = JSON.parse(result);
                    var data = res.data;
                    //名称
                    var catName = [];//在第二个请求完成后插入
                    var phoneName = data.cat[0];
                    var valDa = data.val;
                    //数据通话纪录
                    var phoneCall = [];
                    //时间
                    var times = [];

                    for (var i = 0; i < valDa.length; i++) {
                        times.push(valDa[i].time);
                        phoneCall.push(valDa[i].value[0]);
                    }
                    //其它的通讯方式的接口
                    $.ajax({
                        url:base_url+'emm/dv/shortMessageStatics',
                        data:{
                            beginTime:beginTime,
                            endTime:endTime,
                            owner:owner,
                            unit:unit
                        },
                        success:function(result){
                            if(result){
                                var dataRes = JSON.parse(result).data;
                                catName = dataRes.cat;
                                catName.unshift(phoneName);

                                var valData = dataRes.val;
                                var qqValue = [];
                                var wxValue = [];
                                var dxValue = [];
                                valData.forEach(function(ele,i){
                                    qqValue.push(ele.value[0]);//qq
                                    wxValue.push(ele.value[1]);//微信
                                    dxValue.push(ele.value[2]);//短信


                                })
                                option = {
                                    title: {
                                        id: 'statistic',
                                        text: '通话纪录',
                                        left: 10,
                                        top: 10,
                                        textStyle: {
                                            color: 'rgba(75,189,203,1)',
                                            fontSize: 22,
                                            fontWeight:'normal'
                                        }
                                    },
                                    //整个图距外框的距离
                                    grid: {
                                        left: 40,
                                        top: 95,
                                        bottom: 30
                                    },
                                    tooltip: {
                                        trigger: 'axis',
                                        formatter: function(params) {
                                            return '<dl class="mark-call"><dt>'+params[0].name+'</dt>'+params.map(function(value){
                                                    return '<dd><span style="display:inline-block;position:relative;margin-right:10px;border-color:'+ value.color +';border-radius:10px;width:9px;height:9px;background-color:' + value.color + '"></span>'+value.seriesName+'：'+value.value+'</dd>';
                                                })+'</dl>'
                                        }
                                    },

                                    legend: {
                                        x: 'center',
                                        left:10,
                                        top:40,
                                        textStyle: {
                                            color: 'rgba(62,172,205,1)',
                                            fontSize:16,
                                            fontWeight:'normal'
                                        },
                                        data:catName
                                    },
                                    xAxis: [
                                        {
                                            type: 'category',
                                            interval: 1,
                                            data: times,
                                            boundaryGap: true,//X轴是否从0开始，false是从0开始，true是不从0开始
                                            axisLabel: {
                                                rotate:34,
                                                textStyle: {
                                                    color: 'rgba(62,172,205,1)',
                                                    fontSize:14,
                                                    fontWeight:'normal'
                                                }
                                            },
                                            axisLine: {
                                                onZero: false,
                                                textStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                },
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            }
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            type: 'value',
                                            name: '千次',
                                            nameTextStyle:{
                                                fontSize:14,
                                                fontWeight:'normal'
                                            },
                                            //min: 0,
                                            //max: 250,
                                            //interval: 50,
                                            //底部网格线
                                            splitLine:{
                                                show:false,//底部网格线不显示
                                                lineStyle:{
                                                    width:0
                                                }
                                            },
                                            axisLabel: {
                                                formatter: '{value}'
                                            },
                                            axisLine: {
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            }
                                        },
                                        {
                                            type: 'value',
                                            name: '小时',
                                            nameTextStyle:{
                                                fontSize:14,
                                                fontWeight:'normal'
                                            },
                                            //min: 0,
                                            //max: 25,
                                            //interval: 5,
                                            splitLine:{
                                                show:false,
                                                lineStyle:{
                                                    width:0
                                                }
                                            },
                                            //坐标上文字的样式
                                            axisLabel: {
                                                formatter: '{value}'
                                            },
                                            //坐标线的样式
                                            axisLine: {
                                                lineStyle: {
                                                    color: 'rgba(62,172,205,1)'
                                                }
                                            }
                                        }
                                    ],
                                    series: [
                                        {
                                            name:'通话',
                                            type:'line',
                                            yAxisIndex: 1,
                                            symbol:'circle',//实心圆滑
                                            data:phoneCall,
                                            itemStyle:{
                                                normal:{
                                                    color:'#e8c11a'
                                                },
                                                ////折线，设置颜色
                                                lineStyle:{
                                                    color:'#e8c11a'
                                                }
                                            }
                                        },
                                        {
                                            name:'QQ',
                                            type:'bar',//bar柱形
                                            data:qqValue,
                                            itemStyle: {
                                                normal: {
                                                    color: '#96d3db'
                                                }
                                            }
                                        },
                                        {
                                            name:'微信',
                                            type:'bar',
                                            data:wxValue,
                                            //itemStyle柱形图的颜色
                                            itemStyle: {
                                                normal: {
                                                    color: '#146eb2'
                                                }
                                            }
                                        },
                                        {
                                            name:'短信',
                                            type:'bar',
                                            data:dxValue,
                                            itemStyle: {
                                                normal: {
                                                    color: '#417c46'
                                                }
                                            }
                                        }

                                    ]
                                };
                                myChartCall.clear();
                                myChartCall.setOption(option);

                            }
                        }
                    })
                }
            },
            error:function(errorMsg){
                myChartCall.showLoading({
                    text: '数据加载失败，请联系管理员',
                    color: 'rgba(75,189,203,0)',
                    textColor: 'rgba(75,189,203,1)',
                    maskColor: 'rgba(18,39,76,0.8)',
                    zlevel: 0
                });
            }
        })

    },

    //设置
    settingBtn:function(){
        $('#settingbtn').click(function(event){
            event.stopPropagation();
            $('.settingSelect').toggle();
        });
        //点击空白处隐藏
        $(document).click(function(){
            $('.settingSelect').slideUp('fast');
        });
        //点击筛选条件
        $('.filtrateShowLi').click(function(){
            count.filterContraint();//筛选条件的初始化数据
            $('#modal_default').modal('show');
            //表单默认的态度
            $('#selectedId').val(owner);
            $('.orgUserSelectValue').text(ownerText);
            $('#from').val(beginTime);
            $('#to').val(endTime);

        });
        //点击账户
        $('.accountShowLi').click(function(){
            $('.accountName').text(sessionStorage.getItem('accountName'));
            $('.accountOrg').text(sessionStorage.getItem('accountOrg'));
            $('.accountDetail').text(sessionStorage.getItem('loginName'));
            $('#modal_account').modal('show');

        })
    },

    //tree组织/个人
    treeDataFn:function(){
        //组织
        function orgFn(data,isFirst){
            var template = isFirst ? '<ul class="treeWrapper fancytree-container">' : '<ul class="" style="display: none">';
            for(var i=0;i<data.length;i++){
                var orgData = data[i];
                 template += '<li>'
                            +'         <span onclick="count.addMinus(this,event)" class="fancytree-partsel fa '+(orgData.expanded?'fa-minus-square-o':'fa-plus-square-o') +'"></span>'
                            +'             <span onclick="count.selectedValue(this)" class="fancytree-title" selid="'+orgData.id+'">'+orgData.title+'</span>'
                            +orgFn(orgData.children)
                            +'         <ul style="display: none">'+userFn(orgData.userChildren)+'</ul>'
                            +'</li>';
            }
            template += '</ul>';
            return template;
        }
        //用户
        function userFn(arr){
            var str = '';
            for(var s=0;s<arr.length;s++){
                str += '<li>'
                       +'   <span class="fancytree-partsel">'
                       +'     <span class="fancytree-expander"></span>'
                       +'     <span class="fancytree-title" onclick="count.selectedValue(this)" selid="'+arr[s].id+'">'+arr[s].title+'</span>'
                       +'   </span>'
                       +'</li> '
            }
            return str;
        }

        $('#orgUserSelect').html(orgFn(treeData,true,1))
    },

    //显示组织/个人
    selectUser:function(){
        count.treeDataFn();
        $('.fa-angle-down').toggle();
        $('.fa-angle-right').toggle();
        $('#orgUserSelect').toggle();
        $('.selectOrg .arrows-top').toggle();
    },

    //展开子级
    addMinus:function (_this,event){
        event.stopPropagation();
        $(_this).parent().children('ul').toggle();
        if($(_this).parent().children('ul').css('display') == 'none'){
            $(_this).addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
        }else{
            $(_this).addClass('fa-minus-square-o').removeClass('fa-plus-square-o')
        }
    },

    //改变组合/个人的选中的值
    selectedValue:function(_this){
        $('.orgUserSelectValue').text($(_this).text());
        var selectId = $(_this).attr('selid');
        $('#selectedId').val(selectId);
    },

    //设置开始结束时间选择

    timeSelected:function(_this){
        //$(this).children('.arrows-top').toggle();
        //开始时间
        $( "#from" ).datepicker({
            changeMonth: true,
            changeYear:true,
            numberOfMonths: 1,//此参数控制 显示一个日期选择,
            maxDate:new Date(),
            dateFormat:'yy-mm-dd',
            defaultDate:new Date(),
            showMonthAfterYear:true,
            onClose: function( selectedDate ) {
                $( "#to" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        //结束时间
        $( "#to" ).datepicker({
            changeYear:true,//下拉列表显示年
            changeMonth: true,//下拉列表显示月
            numberOfMonths: 1,
            maxDate:new Date(),//最大的时间是现在
            dateFormat:'yy-mm-dd',//日期格式化
            defaultDate:new Date(),//默认时间
            showMonthAfterYear:true,//在年后显示月
            onClose: function( selectedDate ) {
                $( "#from" ).datepicker( "option", "maxDate", selectedDate );
            }
        });
    },

    //提交表单
    submitForm:function(){
        owner = $('#selectedId').val();
        beginTime = $('#from').val();
        endTime = $('#to').val();
        localStorage.setItem('owner',$('#selectedId').val());
        localStorage.setItem('ownerText',$('.orgUserSelectValue').text());
        localStorage.setItem('beginTime',$('#from').val());
        localStorage.setItem('endTime',$('#to').val());
        initOrgUser();
    },

    //退出表单
    exitForm:function(){
        $.ajax({
            url:base_url+'emm/dv/auth/logout',
            //headers:headers,
            data:{
                userId:sessionStorage.getItem('userId')
            },
            success:function(result){
                debugger;
                if(result){
                    var res = JSON.parse(result);
                    var code = res.code;
                    if(code==0){
                        alert('退出成功');
                        sessionStorage.removeItem('accountName');
                        sessionStorage.removeItem('accountOrg');
                        sessionStorage.removeItem('loginName');
                        window.location.href = 'login.html';
                    }
                }

            }
        })

    },

    //弹窗设置筛选条件的初始化数据
    filterContraint:function(){
        //筛选条件的初始数据
        if(localStorage.getItem('owner')){
            owner = localStorage.getItem('owner');
            ownerText = localStorage.getItem('ownerText');
        }else{
            owner = rootId;
            ownerText = rootText;
        }
        if(localStorage.getItem('beginTime')){
            beginTime = localStorage.getItem('beginTime');
        }else{
            beginTime = count.nowDateTime()[1];
        }
        if(localStorage.getItem('endTime')){
            endTime = localStorage.getItem('endTime');
        }else{
            endTime = count.nowDateTime()[1];
        }
    }






}