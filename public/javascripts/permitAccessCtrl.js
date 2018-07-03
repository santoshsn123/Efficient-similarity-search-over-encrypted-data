app.controller('permitAccessCtrl', function ($scope, $http, $cookieStore, $mdDialog) {
console.log($cookieStore.get('LoggedInuser'));
    $scope.getAllUsers = function()
    {
        $http({
            method: 'POST',
            url: '/getAllMyRequests',
            data: {user:$cookieStore.get('LoggedInuser')},
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.AllUsers = response.data.user;
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
    }
    $scope.getAllUsers();
    $scope.acceptRequest = function(user)
    {
        $http({
            method: 'POST',
            url: '/acceptRequest',
            data: {reqto:$cookieStore.get('LoggedInuser'),reqfrom:user},
        }).then(function successCallback(response) {
            $scope.getAllUsers();
            $scope.message = response.data.message;
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
    }
    $scope.rejectRequest = function(user)
    {
        $http({
            method: 'POST',
            url: '/rejectRequest',
            data: {reqto:$cookieStore.get('LoggedInuser'),reqfrom:user},
        }).then(function successCallback(response) {
            $scope.getAllUsers();
            $scope.message = response.data.message;
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });
    }
});