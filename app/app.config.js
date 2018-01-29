angular.module("myApp").config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/main.htm"
    })
    .when("/updateUser", {
        template : "<edit-user></edit-user>"
    })
    .when("/tournament/:tournamentId", {
        template : "<tournament></tournament>"
    })
    .when("/red", {
        templateUrl : "app/red.htm"
    })
    .when("/green", {
        templateUrl : "app/green.htm"
    })
    .when("/matchgame", {
        template : '<match-game></match-game>'
    })
    .when("/blue/:bookId/ch/:chapterId", {
        templateUrl : "app/blue.htm",
        controller: 'ChapterController'
    });
});
