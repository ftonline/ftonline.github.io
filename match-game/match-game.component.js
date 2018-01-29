
angular.
  module('matchGame').
  component('matchGame', {
    templateUrl : "match-game/match-game.htm",
    controller : function ($scope, $http, $routeParams) {
      
      $scope.cancel = function() {
        window.location.href = '#!';
      }

      $scope.getMatchGame = function() {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'getMatchGame'};
        
	console.log(data);

        $http.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    	  .then(function(response){
      	    console.log(response.data);
            $scope = response.data.game;
	  });
      }

      $scope.getMatchGame();

    }
  });
