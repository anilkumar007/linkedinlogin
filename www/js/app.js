// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ExampleCtrl', function($scope,$cordovaOauth, $http) {

  $scope.login = function(){
    console.warn('linkedin function got called');

    $cordovaOauth.linkedin("75njonl49mjjlt", "I7jkC7j5rcUTBiPt", ['r_basicprofile', 'r_emailaddress']).then(function(result){
      console.warn(result);

      //1st step to get all the basic_details

       $http.get("https://api.linkedin.com/v1/people/~?format=json&oauth2_access_token="+result.access_token).then(function(result) {
            // $scope.profileData = result.data;
            console.warn(result);
        }, function(error) {
            alert("Error getting your profile.");
            console.log(error);
        });

       //2nd step if you want a specific detail try this URL

       //Note: If Image is no updated in linkedin by the user, you can't retrieve it

       $http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token="+result.access_token).then(function(result) {
            // $scope.profileData = result.data;
            console.warn(result);
        }, function(error) {
            alert("Error getting your profile.");
            console.log(error);
        });



    }, function(error){
      console.error(error);
    })
  }
  
})