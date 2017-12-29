
var xmlToJson = {
	loadDoc:function(xmlFileUrl,fn){
		var xhttp;
		try{
		  xhttp = new XMLHttpRequest();
		  xhttp.open("GET", xmlFileUrl, true);
		  xhttp.send();
		}catch(err){
			console.log(err);
		}
	  
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4) {
		  	if(this.status == 200){
		  		xmlToJson.myFunction(this,fn);
		  	}else{
		  		xmlToJson.myFunction(null,fn);
		  	}
		    
		  }
		}
	},
	myFunction:function(xml,fn){
		if(xml){
			var xmlDoc = xml.responseXML;
		    var xListArr = [];
			var xList = xmlDoc.getElementsByTagName("row");
			if(xList.length>0){
				for (var i = 0; i <xList.length; i++) {
				  	var xfieldArr = [];
				  	var fieldArr = xList[i].getElementsByTagName("field");
				  	for(var j=0;j<fieldArr.length;j++){
				  		var fdObjKey = fieldArr[j].getAttribute('name');
				  		if(!fieldArr[j].childNodes[0]){
							var fdObjValue = null;
				  		}else{
				  			var fdObjValue = fieldArr[j].childNodes[0].nodeValue;
				  		}
				  		var fdObj = '{"'+fdObjKey+'":"'+fdObjValue+'"}';
				  		xfieldArr.push(fdObj);
				  	}
					xListArr.push(xfieldArr);
				}
			}else{
				xListArr = ['无符合条件的记录'];
			}

		}else{
			var xListArr = ['无符合条件的记录'];
		}
		fn(xListArr);
	},
	oneGroupAjax:function(){
		var infoArr =xmlToJson.splitCon('#noticeRecord');
		if(infoArr.indexOf('dx')>-1){
			var getFileName,postFileName;
			//不存在聊天内容,需要考虑接收和发送的问题
			var getFileName = infoArr.slice(0,3)+',0,'+infoArr.slice(3,infoArr.length);
			getFileName = getFileName.split(",").join("_");
			var postFileName = infoArr.slice(0,3)+',1,'+infoArr.slice(3,infoArr.length);
			postFileName = postFileName.split(",").join("_");

			//个人的状态
			if(infoArr[2]==0){
				//接收
				var getLoadFiles = xmlToJson.loadDoc('xml/'+getFileName+'.xml',function(res){
					$('.chatSelect1').not('.chatSelect1:hidden').find('tbody').html("");

					if(res[0]=='无符合条件的记录'){
						var strGet = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.chatSelect1').not('.chatSelect1:hidden').find('tbody').html(strGet);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var strPost="";
						for(var i=0;i<res.length;i++){
							strPost += '<tr>'+
								'<td style="color:#388ADF;">'+(i+1)+'</td>'+
								'<td>'+JSON.parse(res[i][1]).staff_name+'</td>'+
								'<td>'+JSON.parse(res[i][0]).num+'</td>'+
							'</tr>';
						}
						$('.chatSelect1').not('.chatSelect1:hidden').find('tbody').html(strPost);
							var allGetNum = res.length/20;
							if(res.length/20<=1){
								$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".pageAll").html("1");
							}else{
								if(res%20 ==0){
									$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".pageAll").html(allGetNum);
								}else{
									$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
								}
							}
							if(res.length<20){
								$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchLeft").hide();
								$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchRight").hide();
							}else{
								/*$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchLeft").show();*/
								$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchRight").show();
							}

					}
					
				});

				//发送
				var postLoadFiles = xmlToJson.loadDoc('xml/'+postFileName+'.xml',function(res){
					$('.chatSelect2').not('.chatSelect2:hidden').find('tbody').html("");
					if(res[0]=='无符合条件的记录'){
						var strGet = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.chatSelect2').not('.chatSelect2:hidden').find('tbody').html(strGet);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var strPost="";
						for(var i=0;i<res.length;i++){
							strPost += '<tr>'+
								'<td style="color:#388ADF;">'+(i+1)+'</td>'+
								'<td>'+JSON.parse(res[i][1]).staff_name+'</td>'+
								'<td>'+JSON.parse(res[i][0]).num+'</td>'+
							'</tr>';
						}
						$('.chatSelect2').not('.chatSelect2:hidden').find('tbody').html(strPost);
							var allGetNum = res.length/20;
							if(res.length/20<=1){
								$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".pageAll").html("1");
							}else{
								if(res%20 ==0){
									$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".pageAll").html(allGetNum);
								}else{
									$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
								}
							}
							if(res.length<20){
								$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".branchLeft").hide();
								$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".branchRight").hide();
							}else{
								/*$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".branchLeft").show();*/
								$('.chatSelect2').not('.chatSelect2:hidden').siblings('.pageBranch').find(".branchRight").show();
							}

					}
					
				});
			}else{
				//群组的状态 
				var getGroupName = infoArr.slice(0,3)+',2,'+infoArr.slice(3,infoArr.length);
				getGroupName = getGroupName.split(",").join("_");
				
				var getGroupFiles = xmlToJson.loadDoc('xml/'+getGroupName+'.xml',function(res){
					$('.chatGroup1').not('.chatGroup1:hidden').find('tbody').html("");

					if(res[0]=='无符合条件的记录'){
						var strGet = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.chatGroup1').not('.chatGroup1:hidden').find('tbody').html(strGet);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var strPost="";
						for(var i=0;i<res.length;i++){
							strPost += '<tr>'+
								'<td style="color:#388ADF;">'+(i+1)+'</td>'+
								'<td>'+JSON.parse(res[i][1]).staff_name+'</td>'+
								'<td>'+JSON.parse(res[i][0]).num+'</td>'+
							'</tr>';
						}
						$('.chatGroup1').not('.chatGroup1:hidden').find('tbody').html(strPost);
							var allGetNum = res.length/20;
							if(res.length/20<=1){
								$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".pageAll").html("1");
							}else{
								if(res%20 ==0){
									$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".pageAll").html(allGetNum);
								}else{
									$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
								}
							}
							if(res.length<20){
								$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".branchLeft").hide();
								$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".branchRight").hide();
							}else{
								/*$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchLeft").show();*/
								$('.chatGroup1').not('.chatGroup1:hidden').siblings('.pageBranch').find(".branchRight").show();
							}

					}
					
				});
			}
			

			//内容
		}else if(infoArr.indexOf('nr')>-1){
			var sumChattedConPer = infoArr.slice(0,2)+',sum,'+infoArr.slice(2,infoArr.length);
			var urlContent = infoArr.slice(0,2)+',url,'+infoArr.slice(2,infoArr.length);
				sumChattedConPer = sumChattedConPer.split(',').join('_');
				urlContent = urlContent.split(',').join('_');
			//那么存在聊天内容,不需要考虑接收和发送的问题
			if(infoArr[2]=='0'){
				//个人
				var chattedConPer = xmlToJson.loadDoc('xml/'+sumChattedConPer+'.xml',function(res){
					$('.chattedConPer').not('.chattedConPer:hidden').find('tbody').html("");
					if(res[0]=='无符合条件的记录'){
						var strGet = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.chattedConPer').not('.chattedConPer:hidden').find('tbody').html(strGet);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var charObj={chatType:"文字",chatGet:0,chatPost:0};
						var imgObj={chatType:"图片",chatGet:0,chatPost:0};
						var radioObj={chatType:"音频",chatGet:0,chatPost:0};
						var videoObj={chatType:"视频",chatGet:0,chatPost:0};
						xmlToJson.loadDoc('xml/'+urlContent+'.xml',function(dataRes){
							
							//给文字，图片，音频，视频进行赋值链接。
							for(var i=0;i<res.length;i++){
								if(JSON.parse(res[i][0]).content_type==1){
									if(JSON.parse(res[i][1]).chat_status=='0'){
										charObj.chatGet = JSON.parse(res[i][2]).num;
									}else if(JSON.parse(res[i][1]).chat_status=='1'){
										charObj.chatPost = JSON.parse(res[i][2]).num;
									}
								}
								else if(JSON.parse(res[i][0]).content_type==2){
									if(JSON.parse(res[i][1]).chat_status=='0'){
										imgObj.chatGet = JSON.parse(res[i][2]).num;
									}else if(JSON.parse(res[i][1]).chat_status=='1'){
										imgObj.chatPost = JSON.parse(res[i][2]).num;
									}
								}
								else if(JSON.parse(res[i][0]).content_type==3){
									if(JSON.parse(res[i][1]).chat_status=='0'){
										radioObj.chatGet = JSON.parse(res[i][2]).num;
									}else if(JSON.parse(res[i][1]).chat_status=='1'){
										radioObj.chatPost = JSON.parse(res[i][2]).num;
									}
								}
								else if(JSON.parse(res[i][0]).content_type==4){
									if(JSON.parse(res[i][1]).chat_status=='0'){
										videoObj.chatGet = JSON.parse(res[i][2]).num;
									}else if(JSON.parse(res[i][1]).chat_status=='1'){
										videoObj.chatPost = JSON.parse(res[i][2]).num;
									}
								}
							}

							//给链接进行赋值
							var linkedObj ={chatType:"链接",chatGet:0,chatPost:0}
							if(dataRes.length>=1 && dataRes[0]!='无符合条件的记录'){
								for(var j=0;j<dataRes.length;j++){
									if(JSON.parse(dataRes[j][1]).chat_status=='0'){
										linkedObj.chatGet = JSON.parse(dataRes[j][0]).num;
									}else if(JSON.parse(dataRes[j][1]).chat_status=='1'){
										linkedObj.chatPost = JSON.parse(dataRes[j][0]).num;
									}
								}
							}
							//将以上数据进行整合
							var chattedArr = [charObj,imgObj,radioObj,videoObj,linkedObj];
							var chattedCon="";
							for(var z=0;z<chattedArr.length;z++){
								chattedCon += '<tr>'+
								'<td style="color:#388ADF;">'+chattedArr[z].chatType+'</td>'+
								'<td>'+chattedArr[z].chatGet+'</td>'+
								'<td>'+chattedArr[z].chatPost+'</td>'+
							'</tr>';
							}
							$(".chattedConPer").not('.chattedConPer:hidden').find("tbody").html(chattedCon);
						})

					}
				})


			}else if(infoArr[2]=='1'){
				//群组表头数据
				var chattedConAll = xmlToJson.loadDoc('xml/'+sumChattedConPer+'.xml',function(res){
					$(".chatConCursor").find("tr").html("");
					var charObj={chatType:"文字",chatNum:0};
					var imgObj={chatType:"图片",chatNum:0};
					var radioObj={chatType:"音频",chatNum:0};
					var videoObj={chatType:"视频",chatNum:0};
					var chattedArr = [charObj,imgObj,radioObj,videoObj];
					if(res.length>0&&res[0]!='无符合条件的记录'){
						for(var i=0;i<res.length;i++){
							if(JSON.parse(res[i][0]).content_type==1){
								charObj.chatNum = JSON.parse(res[i][1]).num;
							}
							else if(JSON.parse(res[i][0]).content_type==2){
								imgObj.chatNum = JSON.parse(res[i][1]).num;
							}
							else if(JSON.parse(res[i][0]).content_type==3){
								radioObj.chatNum = JSON.parse(res[i][1]).num;
							}
							else if(JSON.parse(res[i][0]).content_type==4){
								videoObj.chatNum = JSON.parse(res[i][1]).num;
							}else{
								//
							}
						}
					}
					
					var chattedCon='';
					chattedCon = '<th>'+'排名'+'</th>'+
						'<th>'+'群组名称'+'</th>'+
						'<th style="cursor:pointer;" onclick="xmlToJson.alertChartCon(1)">'+charObj.chatType+'('+charObj.chatNum+')'+'</th>'+
						'<th style="cursor:pointer;" onclick="xmlToJson.alertChartCon(2)">'+imgObj.chatType+'('+imgObj.chatNum+')'+'</th>'+
						'<th style="cursor:pointer;" onclick="xmlToJson.alertChartCon(3)">'+radioObj.chatType+'('+radioObj.chatNum+')'+'</th>'+
						'<th style="cursor:pointer;" onclick="xmlToJson.alertChartCon(4)">'+videoObj.chatType+'('+videoObj.chatNum+')'+'</th>';
					$(".chatConCursor").find("tr").html(chattedCon);
				})
				
				//群组主体数据
				var chattedTbodyStr =infoArr.join("_");
				var chattedConTbody = xmlToJson.loadDoc('xml/'+chattedTbodyStr+'.xml',function(res){
					var dataArr = [];
					$('.chatSplit').not('.chatSplit:hidden').find('.pageNacation').find('tbody').html("");
					if(res[0]=='无符合条件的记录'){
						var ConTbodyStr = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.chatSplit').not('.chatSplit:hidden').find('.pageNacation').find('tbody').append(ConTbodyStr);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						for(var i=0;i<res.length;i++){
							var newGroupName = JSON.parse(res[i][1]).group_name;
							var dataObj = new ChatContent();
							for(var di=0; di<dataArr.length; di++){
								if(dataArr[di].groupName == newGroupName){
									dataObj = dataArr.splice(di,1)[0];
									break;
								}
							}
							dataObj.groupName = newGroupName;  //此时只需要保存两个数据。一个是name一个是number.
							if(JSON.parse(res[i][2]).content_type==1){
								dataObj.charNum = JSON.parse(res[i][3]).num;
							}
							else if(JSON.parse(res[i][2]).content_type==2){
								dataObj.imgNum = JSON.parse(res[i][3]).num;
							}
							else if(JSON.parse(res[i][2]).content_type==3){
								dataObj.radioNum = JSON.parse(res[i][3]).num;
							}
							else if(JSON.parse(res[i][2]).content_type==4){
								dataObj.videoNum = JSON.parse(res[i][3]).num;
							}else{
								//
							}
							dataArr.push(dataObj);
						}



						var allGetNum = dataArr.length/20;
						if(dataArr.length/20<=1){
							$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".pageAll").html("1");
						}else{
							if(res%20 ==0){
								$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".pageAll").html(allGetNum);
							}else{
								$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
							}
						}
						if(dataArr.length<20){
							$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".branchLeft").hide();
							$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".branchRight").hide();
						}else{
							/*$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".branchLeft").show();*/
							$('.chatSplit').not('.chatSplit:hidden').find('.pageBranch').find(".branchRight").show();
						}

						var contentChatStr = "";
						for(var z=0;z<dataArr.length;z++){
							contentChatStr+='<tr>'+
							'<td style="color:#388ADF;">'+(z+1)+'</td>'+
							'<td>'+dataArr[z].groupName+'</td>'+
							'<td>'+dataArr[z].charNum+'</td>'+
							'<td>'+dataArr[z].imgNum+'</td>'+
							'<td>'+dataArr[z].radioNum+'</td>'+
							'<td>'+dataArr[z].videoNum+'</td>'+
							'</tr>';
						}
						$(".chatSplit").not('.chatSplit:hidden').find('.pageNacation').find('tbody').html(contentChatStr);
					}
				})
			}

		}else if(infoArr.indexOf('key')>-1){
			//关键词【敏感词无个人和群组，接收和发送的关系】
			infoArr.splice(2,1);
			var	sensitiveStr = infoArr.join('_');
			var sensitiveStrFiles = xmlToJson.loadDoc('xml/'+sensitiveStr+'.xml',function(res){
				$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').find('tbody').html("");
					if(res[0]=='无符合条件的记录'){
						var strSensitive = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').find('tbody').append(strSensitive);
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var chattedCon='';
						for(var i=0;i<res.length;i++){
							var sensitiveName = JSON.parse(res[i][1]).sensitive_name;
							chattedCon += '<tr><th>'+(i+1)+'</th>'+
								'<th style="cursor:pointer;color:#388ADF;" onclick="xmlToJson.sensitiveConfirm('+"'"+sensitiveName+"','"+sensitiveStr+"'"+')">'+JSON.parse(res[i][1]).sensitive_name+'</th>'+
								'<th>'+JSON.parse(res[i][2]).num+'</th>'+
							'</tr>';
						}
						$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').find('tbody').html(chattedCon);

						var allGetNum = res.length/20;
						if(res.length/20<=1){
							$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".pageAll").html("1");
						}else{
							if(res.length%20 ==0){
								$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".pageAll").html(allGetNum);
							}else{
								$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
							}
						}
						if(res.length<20){
							$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".branchLeft").hide();
							$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".branchRight").hide();
						}else{
							/*$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".branchLeft").show();*/
							$('.sensitiveTdiv').not('.sensitiveTdiv:hidden').siblings('.pageBranch').find(".branchRight").show();
						}
					}

			})

		}else if(infoArr.indexOf('focus')>-1){
			//console.log(infoArr);   //["wx", "focus", "0", "4"]
			var rankHotName = infoArr.join('_');
			var rankHotFile = xmlToJson.loadDoc('xml/focus/'+rankHotName+'.xml',function(res){
			
				$('.rankPersonTerms').not('.rankPersonTerms:hidden').find('tbody').html("");

					if(res[0]=='无符合条件的记录'){
						var strGet = '<tr><td colspan="3">'+res[0]+'</td></tr>';
						$('.rankPersonTerms').not('.rankPersonTerms:hidden').find('tbody').html(strGet);

						$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".branchLeft").hide();
						$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".branchRight").hide();
						$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".pageNow").html("1");	
						$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".pageAll").html("1");	
					}else if(res.length>0&&res[0]!='无符合条件的记录'){
						var strPost="";
						for(var i=0;i<res.length;i++){
							var keywordHot = JSON.parse(res[i][0]).keyword;
							strPost += '<tr>'+
								'<td style="color:#388ADF;">'+(i+1)+'</td>'+
								'<td style="color:#388ADF;cursor:pointer;" onclick="xmlToJson.alertFocusTerm('+(i+1)+",'"+keywordHot+"')"+'">'+keywordHot+'</td>'+
								'<td>'+JSON.parse(res[i][1]).counter+'</td>'+
							'</tr>';
						}
						$('.rankPersonTerms').not('.rankPersonTerms:hidden').find('tbody').html(strPost);
							var allGetNum = res.length/20;

							if(res.length/20<=1){
								$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".pageAll").html("1");
							}else{
								if(res%20 ==0){
									$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".pageAll").html(allGetNum);
								}else{
									$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".pageAll").html(parseInt(allGetNum)+1);
								}
							}
							if(res.length<20){
								$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".branchLeft").hide();
								$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".branchRight").hide();
							}else{
								/*$('.chatSelect1').not('.chatSelect1:hidden').siblings('.pageBranch').find(".branchLeft").show();*/
								$('.rankPersonTerms').not('.rankPersonTerms:hidden').siblings('.pageBranch').find(".branchRight").show();
							}

					}
			})
		}
	},
	splitCon:function(id){
		var splitInfo = Array.prototype.slice.call($(id).find('span'));
		var i,infoArr=[];
		for(i=0,length=splitInfo.length-1;i<length;i++){
			var infoStr = splitInfo[i].getAttribute('datanum');
			infoArr.push(infoStr);
		}
		var infoArrTwo=infoArr[1];  //第二项
		var infoArrThree=infoArr[2];   //第三项
		infoArr[1] = infoArrThree;
		infoArr[2] = infoArrTwo;
		//infoStr:微信，聊天对象,个人，今天
		return infoArr;
		
	},
	alertChartCon:function(type){
		var infoArr =xmlToJson.splitCon('#noticeRecord');
		var  infoArrStr=infoArr.slice(0,3)+','+type+','+infoArr.slice(3,infoArr.length);
		infoArrStr = infoArrStr.split(',').join('_');
		
		xmlToJson.loadDoc('xml/'+infoArrStr+'.xml',function(res){
			$("#chatTalkVideo").show();
			$("#mengban").show();
			$('#chatTalkVideo').find('.pageNacation').find('tbody').html("");
			if(type===1){
				$("#chatTalkVideo .chatTable p").html("文字总量&nbsp;TOP&nbsp;20");
			}else if(type===2){
				$("#chatTalkVideo .chatTable p").html("图片总量&nbsp;TOP&nbsp;20");
			}else if(type===3){
				$("#chatTalkVideo .chatTable p").html("音频总量&nbsp;TOP&nbsp;20");
			}else if(type===4){
				$("#chatTalkVideo .chatTable p").html("视频总量&nbsp;TOP&nbsp;20");
			}
			if(res[0]=='无符合条件的记录'){
				var ConTbodyStr = '<tr><td colspan="3">'+res[0]+'</td></tr>';
				$('#chatTalkVideo').find('.pageNacation').find('tbody').append(ConTbodyStr);
			}else if(res.length>0&&res[0]!='无符合条件的记录'){
				var ConTbodyStr="";
				for(var i=0;i<res.length;i++){
					if(type===1){
						$('#chatTalkVideo').find('.table1').find('tr').html('<th>排名</th><th>群组名称</th><th>收发次数</th><th>链接出现次数</th>');
						ConTbodyStr +=
						'<tr>'+
							'<td>'+(i+1)+'</td>'+
							'<td>'+JSON.parse(res[i][1]).group_name+'</td>'+
							'<td>'+JSON.parse(res[i][2]).num+'</td>'+
							'<td>'+JSON.parse(res[i][3]).urlNum+'</td>'+
						'</tr>';
					}else{
						$('#chatTalkVideo').find('.table1').find('tr').html('<th>排名</th><th>群组名称</th><th>收发次数</th>');
						ConTbodyStr +=
						'<tr>'+
							'<td>'+(i+1)+'</td>'+
							'<td>'+JSON.parse(res[i][1]).group_name+'</td>'+
							'<td>'+JSON.parse(res[i][2]).num+'</td>'+
						'</tr>';
					}
				}		
				$('#chatTalkVideo').find('.pageNacation').find('tbody').html(ConTbodyStr);
				if(type===1){
					$('#chatTalkVideo th,#chatTalkVideo td').css('width','25%');
				}else{
					$('#chatTalkVideo th,#chatTalkVideo td').css('width','33%');
				}
				xmlToJson.popupStyle("#chatTalkVideo");
			}
		})
	},
	alertFocusTerm:function(index,keywordHot){
		//console.log(infoArr);   //["wx", "focus", "0", "4"]
		var infoArr =xmlToJson.splitCon('#noticeRecord');
		var rankHotDetail = infoArr.join('_')+'_'+index,
			personOrFroup = infoArr[2];      //个人还是群组
		xmlToJson.loadDoc('xml/focus/'+rankHotDetail+'.xml',function(res){
			$("#rankFocusTable").show();
			$("#mengban").show();
			$('#rankFocusTable').find('.pageNacation').find('tbody').html("");
			$("#rankFocusTable .titlePer").html(keywordHot);
			if(personOrFroup=="0"){   //个人
				$("#rankFocusTable .table1").find('tr').html('<th>排名</th><th>姓名</th><th>使用次数</th>');
			}else{
				$("#rankFocusTable .table1").find('tr').html('<th>排名</th><th>群组名称</th><th>接收次数</th>');
			}
			if(res[0]=='无符合条件的记录'){
				var ConTbodyStr = '<tr><td colspan="3">'+res[0]+'</td></tr>';
				$('#rankFocusTable').find('.pageNacation').find('tbody').append(ConTbodyStr);
			}else if(res.length>0&&res[0]!='无符合条件的记录'){
				var ConTbodyStr="";
				for(var i=0;i<res.length;i++){
					ConTbodyStr +=
					'<tr>'+
						'<td>'+(i+1)+'</td>'+
						'<td>'+JSON.parse(res[i][0]).keyword+'</td>'+
						'<td>'+JSON.parse(res[i][1]).counter+'</td>'+
					'</tr>';
				}
				$('#rankFocusTable').find('.pageNacation').find('tbody').html(ConTbodyStr);
				xmlToJson.popupStyle("#rankFocusTable");
			}
		})
	},
	sensitiveConfirm:function(sensitiveName,path){
		var getPath = path.split('_');
		getPath.splice(2,0,sensitiveName)
		var sensitivePath=getPath.join("_");
		var sensitiveStrFiles = xmlToJson.loadDoc('xml/'+sensitivePath+'.xml',function(res){
			$("#sensitivePerConfirm").show();
			$("#mengban").show();
			$('#sensitivePerConfirm').find('.pageNacation').find('tbody').html("");
			if(res[0]=='无符合条件的记录'){
				var strSensitive = '<tr><td colspan="3">'+res[0]+'</td></tr>';
				$('#sensitivePerConfirm').find('.pageNacation').find('tbody').html(strSensitive);
			}else if(res.length>0&&res[0]!='无符合条件的记录'){
				var strPost="";
				for(var i=0;i<res.length;i++){
					strPost += '<tr>'+
						'<td style="color:#388ADF;">'+(i+1)+'</td>'+
						'<td>'+JSON.parse(res[i][1]).name+'</td>'+
						'<td>'+JSON.parse(res[i][2]).num+'</td>'+
					'</tr>';
				}
				$('#sensitivePerConfirm').find('.pageNacation').find('tbody').html(strPost);
				xmlToJson.popupStyle("#sensitivePerConfirm");
			}
		})
	},
	popupStyle:function(Id){
		var $this =$(Id).find(".pageNacation").not(".Popup .pageNacation:hidden");
		var $thisTable = $this.find('table').find('tr');
		if($thisTable.length>9){
			//没有滚动条
			$(Id).find('.titClass').addClass('firstOutTab');
			$(Id).find('table').css({'borderTop':'none','borderRight':'none'});
			var scrollWidth = $this.outerWidth() - $this.find('table').outerWidth(); 
			$(Id).find('.firstOutTab').css('paddingRight',(scrollWidth-1)+'px');
		}else{
			$(Id).find('div').removeClass('firstOutTab');
			$(Id).find('table').css({'borderTop':'1px solid #d8dce5','borderRight':'1px solid #d8dce5'});
			$(Id).find('.titClass').css('paddingRight',0+'px');
		}
	}
	
}
/**
聊天内容类
*/
function ChatContent(){
	this.groupName = "";
	this.groupId = ""
	this.charNum = 0;
	this.imgNum = 0;
	this.radioNum = 0;
	this.videoNum = 0
}
