angular.module("myApp", ["ngRoute","signIn"])
	.controller('ChapterController', function($scope, $routeParams) {
				$scope.params = $routeParams;
			}
		);
