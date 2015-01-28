// setter
var app = angular.module("app",['ngRoute']);

app.config(function($routeProvider){

	$routeProvider.when('/login',{
		templateUrl: 'login.html',
		controller: 'LoginController'
	});


	$routeProvider.when('/showcase',{
		templateUrl: 'showcase.html',
		controller: 'ShowcaseController'
	});

	$routeProvider.otherwise({ redirectTo: '/login' });
});

/* getter
	angular.module("app");
*/




// extract auth into a service object, an interface = encapsulation/isolation
// creating alternative services would be fine, just match the interface - login(credentials) and logout()

app.factory("AuthenticationService", ['$location',function($location){
	return {
		login: function(credentials){
			if(credentials.username == 'jon') {
				$location.path('/showcase');
			}
		},
		logout: function(){
			$location.path('/login');
		}
	};
}]);


/***********************************************************************************************/
/* Controllers  */
/***********************************************************************************************/


app.controller('LoginController', ['$scope','$location','AuthenticationService',function($scope, $location, AuthenticationService){

	$scope.credentials = {'username': "", 'password' : ""};

	$scope.login = function(){
		AuthenticationService.login($scope.credentials);
	};

}]);

app.controller('ShowcaseController', ['$scope','AuthenticationService',function($scope, AuthenticationService){

	$scope.breadcrumb = 'Showcase!';
	$scope.desc = 'Mouse over these images to see a directive at work';

	$scope.logout = function(){
		AuthenticationService.logout();
	};
}]);

/***********************************************************************************************/
/* Directives   */
/***********************************************************************************************/

app.directive('showsDescWhenHovered', function(){
		return {
			restrict: "A", // A = Attribute, C = Class Name, E = Element, M = HTML Comment	
			link: function(scope, element, attributes){
				var originalDesc = scope.desc;
				element.bind("mouseenter", function(){
					scope.desc = attributes.desc;
					scope.$apply();
 				});
				element.bind("mouseleave",function(){
					scope.desc = originalDesc;
					scope.$apply();
				});
			}
		};
	});
