app.controller('allusersCtrl',function($scope,$http, $cookieStore, $mdDialog){
    $scope.loggedInUser = $cookieStore.get('LoggedInuser');
   $scope.getAllUsers = function()
   {
        $http({
            method: 'POST',
            url: '/getallUsers',
            data: {user:$cookieStore.get('LoggedInuser')},
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.AllUsers = response.data.user;
            // console.log("Other data :- ", $scope.AllFiles);
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
   }
   $scope.getAllUsers();

   $scope.requestAccess = function(reqto)
   {
        $http({
            method: 'POST',
            url: '/requestAccess',
            data: {reqfrom:$cookieStore.get('LoggedInuser'),reqto:reqto},
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.getAllUsers();
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
   }

   $scope.cancelRequest = function(reqto)
   {
        $http({
            method: 'POST',
            url: '/cancelRequest',
            data: {reqfrom:$cookieStore.get('LoggedInuser'),reqto:reqto},
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.getAllUsers();
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
   }

   

});