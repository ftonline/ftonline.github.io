
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

        $http.get(SERVER_URL+'?func=getMatchGame&token='+id_token)
    	  .then(function(response){
            $scope.game = response.data.game;
	      });
      }

      var isGapiLoaded = false;
      gapi.load('auth2', function() {
        var params = {client_id: getVideoContent('google-signin-client_id')};
        gapi.auth2.init(params);
        gapi.auth2.getAuthInstance().then(function(){
          $scope.getMatchGame();
          isGapiLoaded = true;
        });
      });


      


      var interval = $interval(function() {
        if(!isGapiLoaded) return;
        $scope.getMatchGame();
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

      $scope.checkinMatchGame = function() {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'checkinMatchGame'};
        
        $http.post(SERVER_URL, data)
    	  	.then(function(response){
      	    console.log(response.data);
				});
      }

    }























  });
