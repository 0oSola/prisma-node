(function(){
	angular.module("blogApp",["ui.router"]).config(["$urlRouterProvider",function($urlRouterProvider){
		$urlRouterProvider.otherwise("/blog");
	}])
})()