
angular.
  module('tournament').
  component('tournament', {
    templateUrl : "tournament/tournament.htm",
    controller : function ($scope, $http, $routeParams) {
      
      $scope.cancel = function() {
				window.location.href = '#!';
			}


      $http.get('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec?func=getTournament&tournamentId=' + $routeParams.tournamentId)
        .then(function(response){
          console.log(response.data);
          $scope.tournament = response.data;
        });
	}
});
