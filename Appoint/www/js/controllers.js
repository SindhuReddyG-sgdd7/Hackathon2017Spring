angular.module('starter.controllers', [])



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicPopup) {

     
  $scope.chat = Chats.get($stateParams.chatId);
    $scope.data = Chats.data($scope.chat.id);
    console.log($scope.chat.datetime);
    console.log($scope.chat.id);
   console.log($scope.chat.name);
    $scope.getDetected = function($index){
        console.log($index);
        Chats.showAlert($index,$scope.chat.datetime,$scope.chat.name);
        
    }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});