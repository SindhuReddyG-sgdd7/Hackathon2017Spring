// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('Login', {
            url: '/login',
            templateUrl: 'templates/Login.html',
            controller: 'LoginController'
        })

        .state('Register', {
            url: '/register',
            templateUrl: 'templates/Registration.html',
            controller: 'RegistrationController'
        })
  
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'AnalysisController'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

app.controller("LoginController", function($scope, $http, $state, $httpParamSerializerJQLike, $q) {
    console.log("Login");


    $scope.login = function(username, password) {

        console.log("inside login function");
        $http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/appointdb/collections/users?q={username:\'' + username + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })
            .success(function(data) {
                    // alert(data[0]._id.$oid);
                    console.log(data);
                    if (data == "") {
                        alert("No user exists with username: " + username);
                        console.log("No user exists with username: " + username);
                        $state.go("Login");
                    } else if (username == data[0].username && password == data[0].password) {

                            // Instance stores a reference to the Singleton
                            var instance;

                            function init() {
                                // Singleton
                                // Private methods and variables
                                function privateMethod() {
                                    console.log("I am logged in");
                                }

                                var privateVariable = "I am also logged in";
                          
                            };

                        alert("Login Succesful!");
                        
                        localStorage.setItem("UserName", username);
                        document.getElementById("username").innerHTML = "";
                        document.getElementById("password").innerHTML = "";
                        console.log("Success");
                        $state.go("tab.dash");
                        
                        }
                    else {
                        alert("Incorrect username or password");
                        console.log("Incorrect username or password");
                        $state.go("Login");
                    }
                })
        .error(function() {
            alert("error");
            consol.log("error");
            $state.go("Login");
        })
    }
    
    $scope.register = function() {
        $state.go("Register");
    }
});

app.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {
    
    console.log("Register");
     $scope.createUser = function() {
               console.log("inside login function");
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobilenumber = document.getElementById("mobilenumber").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        $http({
            method: 'POST',
            url : 'https://api.mlab.com/api/1/databases/appointdb/collections/users?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
            data: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                mobilenumber: mobilenumber,
                username: username,
                password: password
                    }),
            contentType: "application/json"
        }).success(function() {
            alert("Successfully Registered!");
            $scope.lastname ="";
            $scope.mobilenumber ="";
            $scope.username ="";

            $scope.firstname ="User created successfully";            
            $state.go("Login");
                })
        .error(function() {
  alert("error");
            $state.go("Login");
})
     }    
});

app.controller("AnalysisController", function($scope, $http,$state) {
  
    $scope.getUsers = function(){
    username = localStorage.getItem("UserName");
   
        console.log("jysw");
        $scope.reci= [];
   $http({
               type: "GET",
               url: 'https://api.mlab.com/api/1/databases/appointdb/collections/users?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

               contentType: "application/json"
           })
           .success(function(data) {
       
       for(i=0;i<data.length;i++){
           if(data[i].username != username)
           $scope.reci.push(data[i].username);
            
       }
     console.log($scope.reci);
        
    })
  
    }
    
    $scope.analyzetext  = function(){
        
        textmessage = document.getElementById("textentered").value;
                    
        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.intellexer.com/recognizeNeText?apikey=d2c03af6-3dd5-4aa4-b778-9b363122bb57&loadNamedEntities=true&loadRelationsTree=true&loadSentences=true",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache"
  },
  "data": textmessage
}

$.ajax(settings).done(function (response) {
 console.log(response);
   mapObj={}; $scope.arr=[];
   for(i=0;i<response.entities.length;i++){
     console.log(response.entities[i].text);
           mapObj[response.entities[i].text] = "<a href=\' \'>" +response.entities[i].text +"</a>";
            $scope.arr.push(response.entities[i].text);
     }
   console.log(mapObj);
    console.log($scope.arr[0]);
    console.log($scope.arr[1]);
  textmessage = replaceAll(textmessage,mapObj);
   document.getElementById("AnalyzedText").innerHTML = "<b>Analysed text: </b>" + textmessage;
   
   function replaceAll(str,mapObj){
   var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

   return str.replace(re, function(matched){
       return mapObj[matched];
   });
}
 
});   
        
    
}
    
  $scope.sendtext  = function(){
  
        textmessage = document.getElementById("textentered").value;
                    
        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.intellexer.com/recognizeNeText?apikey=d2c03af6-3dd5-4aa4-b778-9b363122bb57&loadNamedEntities=true&loadRelationsTree=true&loadSentences=true",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache"
  },
  "data": textmessage
}
$scope.arr=[];
$.ajax(settings).done(function (response) {
 console.log(response);
   mapObj={}; 
   for(i=0;i<response.entities.length;i++){
     console.log(response.entities[i].text);
           mapObj[response.entities[i].text] = "<a href=\' \'>" +response.entities[i].text +"</a>";
          $scope.arr.push(response.entities[i].text);
     }
   console.log(mapObj);
    if(response.entities.length < 1)
        clearTimeout(myVar);
   
   textmessage = replaceAll(textmessage,mapObj);
   
   console.log(textmessage);
   function replaceAll(str,mapObj){
   var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

   return str.replace(re, function(matched){
       return mapObj[matched];
   });
}
 
});
  
var myVar = setTimeout(myTimer, 1400);
    
function myTimer() {
   
  recipient = document.getElementById("recipient").value;
    recipient = recipient.substring(7,recipient.length);
  console.log(recipient);
  username = localStorage.getItem("UserName");
  $scope.messages = [];
console.log(textmessage);
  textsent = textmessage; 
    $scope.messages.push(textmessage); 
    $scope.newarr = [];
    $scope.newarr.push($scope.arr);
  
        $http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/appointdb/collections/chats?q={username:\'' + username + '\',recipient:\''+recipient + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })
            .success(function(data) {
                  
    if (data == "") {
                       
        $http({
           method: 'POST',
           url : 'https://api.mlab.com/api/1/databases/appointdb/collections/chats?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
           data: JSON.stringify({
               textmessage: $scope.messages,
               username: username,
               recipient: recipient,
               detected: $scope.newarr
                   }),
                contentType: "application/json"
                    }).success(function() {
                                alert("Successfully Sent!");
            document.getElementById("textentered").value = "";
     document.getElementById("recipient").value = "";
               })
            .error(function() {
                          })                        
                    } else if (username == data[0].username && recipient == data[0].recipient) {
                        $scope.messages = data[0].textmessage;
                        $scope.messages.push(textsent);
                        $scope.newarr = data[0].detected;
                        $scope.newarr.push($scope.arr);
                        $scope.newmessage = $scope.messages;
                        $scope.newarray = $scope.newarr;
                        console.log($scope.newmessage);
                   $http({
                       method: 'DELETE' ,   
                       url: 'https://api.mongolab.com/api/1/databases/appointdb/collections/chats/'+data[0]._id.$oid+'?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
                   }).success(function (data) {
                   })   
                   $http({
           method: 'POST',
           url : 'https://api.mlab.com/api/1/databases/appointdb/collections/chats?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
           data: JSON.stringify({
               textmessage: $scope.newmessage,
               username: username,
               recipient: recipient,
               detected: $scope.newarray
                   }),
                contentType: "application/json"
                    }).success(function() {
                            alert("Successfully Sent!");
                            document.getElementById("textentered").value = "";
                            document.getElementById("recipient").value = "";
                        })
                            .error(function() {
                        })
                    }
            else { }
        })
        .error(function() {
            alert("error");
            consol.log("error");
            $state.go("Login");
        })
    }
  }
    
});

