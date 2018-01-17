
angular.
  module('tournaments').
  component('tournaments', {
    templateUrl : "tournaments/tournaments.htm",
    controller : function ($scope, $http) {
      $http.get('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec?func=getTournaments')
        .then(function(response){
          console.log(response.data);
          $scope.tournaments = response.data;
        });
	}
});
