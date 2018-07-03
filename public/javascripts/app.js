var app = angular.module('MainApp', ['ngMaterial', 'ngMessages','ngCookies','ngRoute','ngMaterial','ngFileUpload']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/homePage.html",
        controller : "homeCtrl"
    })
    .when("/task", {
        templateUrl : "template/task.html",
        controller : "taskCtrl"
    })
    .when("/setting", {
        templateUrl : "template/setting.html",
        controller : "settingCtrl"
    })
    .when("/allusers", {
        templateUrl : "template/allusers.html",
        controller : "allusersCtrl"
    }).
    when("/fileUpload", {
        templateUrl : "template/fileUpload.html",
        controller : "fileUpload"
    }).
    when("/search", {
        templateUrl : "template/search.html",
        controller : "searchCtrl"
    }).
    when("/permitAccess", {
        templateUrl : "template/permitAccess.html",
        controller : "permitAccessCtrl"
    })
    .when("/profileUpdate",{
        templateUrl : "template/profileUpdate.html",
        controller : "profileUpdate"
    });
});

app.controller('MainController',function($scope,$http,$cookieStore,$route)
{
    $scope.routes = $route;
    $scope.user = $cookieStore.get('LoggedInuser');
console.log("Controller Called here ",$route);
if(!$cookieStore.get('LoggedInuser'))
{
    // console.log("How you could be here :- ");
    window.location.href="index.html";
}

$scope.logOut = function()
{
    var value = $cookieStore.get('LoggedInuser');
    $cookieStore.remove('LoggedInuser');
    window.location.href = "login.html";
}

});


app.controller('taskCtrl',function($scope,$http,$cookieStore)
{
console.log("taskCtrl Called here ");

});
app.controller('settingCtrl',function($scope,$http,$cookieStore)
{
console.log("settingCtrl Called here ");

});



app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);