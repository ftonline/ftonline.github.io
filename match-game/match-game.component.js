
angular.
  module('matchGame').
  component('matchGame', {
    templateUrl : "match-game/match-game.htm",
    controller : function ($scope, $http, $routeParams, $interval) {
      
      $scope.cancel = function() {
        window.location.href = '#!';
      }

      $scope.getMatchGame = function() {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'getMatchGame'};
        
	console.log(data);

        $http.get('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec?func=getMatchGame'
          +'&token='+id_token)
    	  .then(function(response){
      	    console.log(response.data);
            $scope.game = response.data.game;
            if ($scope.game.player1 == 'YOU') {
              $scope.game.oponentUser = $scope.game.player2
            } else {
              $scope.game.oponentUser = $scope.game.player1
            }
	  });
      }


      $scope.getMatchGame();


      var interval = $interval(function() {
        console.log('tfuBlat');
      }, 5000);


      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopInterval();
      });


      $scope.stopInterval = function() {
        if (angular.isDefined(interval)) {
          $interval.cancel(interval);
          interval = undefined;
        }
      };

      

    }























  });
