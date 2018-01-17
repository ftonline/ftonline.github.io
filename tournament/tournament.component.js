
angular.
  module('tournament').
  component('tournament', {
    templateUrl : "tournament/tournament.htm",
    controller : function ($scope, $http, $routeParams) {
      console.log($routeParams.tournamentId)
	}
});
