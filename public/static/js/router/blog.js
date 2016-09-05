(function(){
	var blogApp = angular.module("blogApp");
	blogApp.config(["$stateProvider",function($stateProvider){
		$stateProvider.state("blog",{
			url:"/blog",
			views:{
				"blogBox":{
					templateUrl:"../router/blog.html"
				}
			}
		}).state("blog.detail",{
			url:"/:blogId",
			views:{
				"blogDetail":{   
					templateUrl:"../router/blogDetail.html",
					controller:"detailController"
				}
			}
		}) 
	}])

	//获取传入值
	blogApp.controller("detailController",["$stateParams","$scope",function($stateParams,$scope){
		var id = 1;
		$scope.list = [];
		console.log($stateParams.blogId);
		
		$scope.add =function(){
			var obj = {
				"name":"123_"+id,
				"id":id
			};
			id++;
			$scope.list.push(obj);
			console.log(obj);
		},
		$scope.delete =function(idx){
			$scope.list.splice(idx,1);
			console.log($scope.list);
		}
	}])
})()