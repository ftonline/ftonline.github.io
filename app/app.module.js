angular.module("myApp", ["ngRoute"])
	.controller('ChapterController', function($scope, $routeParams) {
				$scope.params = $routeParams;
			}
		);
