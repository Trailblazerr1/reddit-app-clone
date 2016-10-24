
//self calling fun (function(){
 //                 some code…
//                 })();

(function() {
var app = angular.module('myreddit', ['ionic','angularMoment'])


app.controller('RedditCtrl',function($scope,$http) {
  $scope.stories = [];
  $http.get('https://www.reddit.com/r/todayilearned/new/.json')
    .success(function(response) {
      angular.forEach(response.data.children,function(child) {
        $scope.stories.push(child.data);
      });
    });

    $scope.loadMore = function() {
      var params ={};
      if($scope.stories.length > 0) {
        params['after'] = $scope.stories[$scope.stories.length -1].name;
      }
      $http.get('https://www.reddit.com/r/todayilearned/new/.json',{params:params})
        .success(function(response) {
        angular.forEach(response.data.children,function(child) {
        $scope.stories.push(child.data);
      });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    };
});




app.run(function($ionicPlatform) {
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
});
}());
