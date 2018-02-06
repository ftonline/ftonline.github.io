
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
            console.log($scope.game);

            $scope.showConfirmationModel();
	      });
      }

      var isGapiLoaded = false;
      gapi.load('auth2', function() {
        var params = {client_id: getMetaContent('google-signin-client_id')};
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

      $scope.numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

      $scope.showConfirmationModel = function() {
        $scope.game;
        if (isEmptyString($scope.game.userScore)) {
          return;
        }

        if ($scope.oOponentScore == $scope.game.oponentScore && $scope.oUserScore == $scope.game.userScore) {
          return;
        }

        $scope.oOponentScore = $scope.game.oponentScore;
        $scope.oUserScore = $scope.game.userScore;

        $('#myModal').modal('show');
      }

      $scope.oOponentScore = '';
      $scope.oUserScore = '';

      $scope.oponentScore = '0';
      $scope.userScore = '0';

      $scope.updateScoreMatchGame = function() {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'updateScoreMatchGame',oponentScore:$scope.oponentScore, userScore:$scope.userScore};
        console.log(data);
        $http.post(SERVER_URL, data)
    	  	.then(function(response){
      	    console.log(response.data);
				});
      }
    }























  });
