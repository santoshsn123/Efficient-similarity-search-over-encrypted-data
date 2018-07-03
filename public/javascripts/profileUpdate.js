app.controller('profileUpdate', function ($scope, $http, $cookieStore, $mdDialog,Upload) {
  $scope.register =  $cookieStore.get('LoggedInuser');
  delete $scope.register["u_password"];
  console.log( $scope.register);

  $scope.UpdateForm = function () {
    $http({
        method: 'POST',
        url: '/updateUser',
        data: $scope.register,
    }).then(function successCallback(response) {
        console.log("Success : - ", response.data.message);
        $scope.message = response.data.message;
        $cookieStore.put('LoggedInuser',$scope.register);
    }, function errorCallback(response) {
        console.log("Error : - ", response);
    });
}


$scope.$watch('profilePic', function() {
    if($scope.profilePic)
    {
        // console.log("Insdide ::::::::::::::: ");
        $scope.uploadProfilePic();
    }
});

$scope.uploadProfilePic = function()
{
    $cookieStore.get('LoggedInuser');
        Upload.upload({
            url: '/profilePicUpdate',
            file: $scope.profilePic,
            data:{user:$cookieStore.get('LoggedInuser')},
          }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function(data, status, headers, config) {
            if(data.status)
            {
                $scope.register.u_profilePic =  data.profilePic;
                $cookieStore.put('LoggedInuser',$scope.register);
            }
          }).error(function(data, status, headers, config) {
            console.log('error status: ' + status);
          })
}
$scope.ChangePass = function()
{
    $scope.chpass;
    if($scope.chpass.newpass!=$scope.chpass.cpass)
    {
        $scope.passMessage = "Password Missmatch ";
        return;
    }
    else{
    
            $http({
                method: 'POST',
                url: '/changePass',
                data: {password:$scope.chpass,user:$scope.register},
            }).then(function successCallback(response) {
                console.log("Success : - ", response.data.message);
            }, function errorCallback(response) {
                console.log("Error : - ", response);
            });
    }
}



});