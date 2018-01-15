
angular.
  module('editUser').
  component('editUser', {
    templateUrl : "edit-user/edit-user.htm",
    controller : function ($scope, $http) {
	var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        var data = {token:id_token,func:'retrieveUser'};
  	signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    	  .then(function(response){
      	    console.log(response.data);
	    $scope.user = response.data;
          });

	$scope.submit = function() {
	  var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
	  var data = {token:id_token,func:'updateUser', firstName:$scope.user.firstName,
	    lastName:$scope.user.lastName, phone:$scope.user.phone, fifaUser:$scope.user.fifaUser};
	  console.log(data);
	  signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    	  .then(function(response){
      	    console.log(response.data);
	    $scope.user = response.data;
	    window.location.href = '#!';
          });
	}

    }
  });
