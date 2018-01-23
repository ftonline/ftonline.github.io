
angular.
  module('tournament').
  component('tournament', {
    templateUrl : "tournament/tournament.htm",
    controller : function ($scope, $http, $routeParams) {
      
      $scope.cancel = function() {
        window.location.href = '#!';
      }

      $scope.registerTournament = function () {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'registerTournament', tournamentId:$routeParams.tournamentId};
        
	console.log(data);

        signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    	  .then(function(response){
      	    console.log(response.data);
	    window.location.href = '#!';
	   });
      }


      $http.get('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec?func=getTournament&tournamentId=' + $routeParams.tournamentId)
        .then(function(response){
          console.log(response.data);
          $scope.tournament = response.data;
        });
	}
});
