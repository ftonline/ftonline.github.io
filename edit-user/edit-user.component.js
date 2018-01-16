
angular.
  module('editUser').
  component('editUser', {
    templateUrl : "edit-user/edit-user.htm",
    controller : function ($scope, $http) {
			$scope.applicationData = applicationData;
			$scope.cancel = function() {
				window.location.href = '#!';
			}

			$scope.submit = function() {
	  		var id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
	  		var data = {token:id_token,func:'updateUser', firstName:$scope.applicationData.user.firstName,
	    	lastName:$scope.applicationData.user.lastName, phone:$scope.applicationData.user.phone, fifaUser:$scope.applicationData.user.fifaUser};
	  		console.log(data);
	  		signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    	  	.then(function(response){
      	    console.log(response.data);
	    			window.location.href = '#!';
				});
			}
	}
});
