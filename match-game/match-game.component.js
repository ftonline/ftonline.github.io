
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
            console.log(response);

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
        $scope.getLeagueTables();
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

      $scope.updateScoreMatchGame = function(iuserScore, ioponentScore) {
        var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'updateScoreMatchGame',oponentScore:ioponentScore, userScore:iuserScore};
        console.log(data);
        $http.post(SERVER_URL, data)
    	  	.then(function(response){
      	    console.log(response.data);
				});
      }

      $scope.leags = [];
      
      $scope.getLeagueTables = function() {
        if ($scope.game == undefined) {
          return;
        }
        $http.get(SERVER_URL+'?func=getLeagueTables&tournamentId=' + $scope.game.tournamentId + '&groupName=' + $scope.game.group)
        .then(function(response) {
          console.log(response.data);
          $scope.leags = response.data;
        });
      }

      $scope.getLeagueTables();

    }























  });
