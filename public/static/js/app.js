(function(){
	//var data = '{"imgUrl":"http://123.jpg","imgName":"123.jpg"}'
	var prismaApp = angular.module("prismaApp",[]);

	prismaApp.controller("buildController",function($scope,$http){
		
		$scope.form = {
			"type":""
		}
	})

	prismaApp.directive("fileupload",function(){
		return {
			restrict:"ECMA",
			link:function($scope,$element,$attrs){
				// Translated
				var drEvent = $element.dropify({
					messages: {
						'default': '点击或拖拽图片到这里',
						'replace': '点击或拖拽图片到这里来替换图片',
						'remove':  '移除文件',
						'error':   '对不起，你上传的文件太大了'
					}
				});
				/*drEvent.on('dropify.beforeClear', function(event, element){
					console.log(element);
				});
			
				drEvent.on('dropify.afterClear', function(event, element){});*/
			}
		};
	})

	prismaApp.directive("wrapWatcher",function(){
		return{
			restrict:"ECMA",
			scope:true,
			link:function($scope,$element,$attrs){
				$element.elastislide({
					minItems : 2
				});
				$element.find(".style-item").on("click",function(){
					$(".style-item").removeClass("select");
					$(this).addClass("select");
					var type = $(this).attr("data-type");
					$scope.$apply(function(){
						$scope.form.type = type;
					});
				})
			}
		}
	})

	prismaApp.directive("buildbtn",function($http){
		return {
			restrict:"ECMA",
			link:function($scope,$element,$attrs){
				$element.bind("click",function(){
					var filepath=$("input[name='imgFile']").val();
					var extStart=filepath.lastIndexOf(".");
					var ext=filepath.substring(extStart,filepath.length).toUpperCase();
					console.log(filepath)
					if(filepath==""||filepath==null){
						var notification = new NotificationFx({
							message : '<p>请先上传文件</p>',
							layout : 'growl',
							effect : 'genie',
							type : 'notice', // notice, warning or error
							ttl : 1000,
							onClose : function() {
							}
						})
						notification.show();
						return false;
					}

					if(ext!=".JPG"&&ext!=".JPEG"&&ext!=".PNG"&&ext!=".GIF"){
						var notification = new NotificationFx({
							message : '<p>上传文件限于jpg,jpeg,png,gif格式</p>',
							layout : 'growl',
							effect : 'genie',
							type : 'notice', // notice, warning or error
							ttl : 1000,
							onClose : function() {
							}
						});

						notification.show();
						return false;
					}


					var filetype = $("input[name='imgType']").val();
					if(filetype==""||filetype==null){
						var notification = new NotificationFx({
							message : '<p>选择生成的风格</p>',
							layout : 'growl',
							effect : 'genie',
							type : 'notice', // notice, warning or error
							ttl : 1000,
							onClose : function() {
							}
						});

						notification.show();
						return false;
					}
					  
					$('body').waitMe({
						effect: "bounce",
						text: '正在上传,并生成图片中...',
						bg: 'rgba(0,0,0,0.7)',
						color:'#000',
						sizeW:'',
						sizeH:'',
						source: 'img.svg'
					});


					//console.log($scope);
					var formData = new FormData($("#frmUpload")[0]);
					$http({
						url:"/buildPic",
						method:"POST",
						data:formData,
						transformRequest: angular.identity,
						headers:{
							"Content-Type": function () {
		                        return undefined;
		                    }
						}
					}).then(function callbackSuccess(response){
						$scope.imgUrl = angular.fromJson(response).imgUrl;
						$scope.imgName = angular.fromJson(response).imgName;
						$scope.$apply();
						setTimeout("$('body').waitMe('hide')",1000);
					},function callbackError(){

					})

					/*$scope.imgUrl = angular.fromJson(data).imgUrl;
					$scope.imgName = angular.fromJson(data).imgName;
					$scope.$apply();

					setTimeout("$('body').waitMe('hide')",1000);*/
				})
			}
		}
	})

})()