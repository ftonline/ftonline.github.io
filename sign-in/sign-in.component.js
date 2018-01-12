angular.
  module('signIn').
  component('signIn', {
        templateUrl : "sign-in/sign-in.htm",
	controller : function ($scope) {
		var options = {
		  width: 120,
		  height: 50,
		  onsuccess: onSignIn
		}

		gapi.signin2.render('g-signin2', options)
	}
  });
        




function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log(profile);
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}


function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.disconnect();
}

