
angular.
  module('tournaments').
  component('tournaments', {
    templateUrl : "tournaments/tournaments.htm",
    controller : function ($scope, $http) {
      $http.get(SERVER_URL+'?func=getTournaments')
        .then(function(response){
          console.log(response.data);
          $scope.tournaments = response.data;
        });
	}
});
