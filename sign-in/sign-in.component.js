var signInHttp;
var signInScope;
var signInUser;

angular.
  module('signIn').
  component('signIn', {
    templateUrl : "sign-in/sign-in.htm",
    controller : function ($scope, $http) {
      var options = {
        width: 120,
        height: 50,
        onsuccess: onSignIn
      }

      $scope.applicationData = applicationData;
      applicationData.signInScope = $scope;

      signInHttp = $http;
      signInScope = $scope;
      signInScope.isSinedIn = false;

      gapi.signin2.render('g-signin2', options)
    }
  });
        




function onSignIn(googleUser) {
  signInScope.isSinedIn = true;
  var profile = googleUser.getBasicProfile();
  
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  
  var data = {token:id_token,func:'retrieveUser'};
  
  var userId = String(profile.getId());


  signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    .then(function(response){
      applicationData.user = response.data;
      signInScope.userName = response.data.firstName;
    });
}


function signOut() {
  signInScope.userName = '';
  signInScope.isSinedIn = false;
  signInScope.$apply();
  window.location.href = '#!';
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
}

