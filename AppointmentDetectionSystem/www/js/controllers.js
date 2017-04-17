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

.controller('AccountCtrl', function($scope, $http, $state) {
    

    username = localStorage.getItem("UserName");
    $http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/appointdb/collections/users?q={username:\'' + username + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })
            .success(function(data) {
          document.getElementById("firstname").innerHTML = data[0].firstname;
        document.getElementById("lastname").innerHTML = data[0].lastname;
        document.getElementById("username").innerHTML = data[0].username;
        document.getElementById("mobilenumber").innerHTML = data[0].mobilenumber;
    });
    $state.go($state.current, {}, {reload: true});
    
    
            $scope.logout = function(){
            $state.go("Login");
            }
    
});
