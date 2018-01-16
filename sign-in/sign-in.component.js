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

      signInHttp = $http;
      signInScope = $scope;
      signInScope.isSinedIn = false;

      gapi.signin2.render('g-signin2', options)
    }
  });
        




function onSignIn(googleUser) {
  signInScope.isSinedIn = true;
  var profile = googleUser.getBasicProfile();
  console.log(profile);
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  
  var data = {token:id_token,func:'retrieveUser'};
  signInHttp.post('https://script.google.com/macros/s/AKfycbyILJZ7cIl5yq0GQycXQHVsuniIZlxUmHVwlwmTEnu86dwNjZvW/exec', data)
    .then(function(response){
      console.log(response.data);
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

