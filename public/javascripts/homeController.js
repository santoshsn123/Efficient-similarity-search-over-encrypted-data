
app.controller('homeCtrl', function ($scope, $http, $cookieStore, $mdDialog) {
    $scope.getAllUsers = function () {
        $http({
            method: 'GET',
            url: '/getUsers',
            data: $scope.login,
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.AllUsers = response.data;
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });

    }
    $scope.getAllUsers();

    $scope.openform = function (ev) {

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                $scope.getAllUsers();
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

        function DialogController($scope, $mdDialog) {

            $scope.userTypes = ['Admin', 'Superadmin', 'User'];
            $scope.add_user = function () {
                if ($scope.user.password != $scope.user.cpassword) {
                    $scope.errorMessage = "Password Missmatch ..!";
                }
                else {
                    delete $scope.user["cpassword"];
                    $http({
                        method: 'POST',
                        url: '/saveUsers',
                        data: $scope.user,
                    }).then(function successCallback(response) {
                        $mdDialog.hide();
                    }, function errorCallback(response) {
                    });
                }
            }
        }
    }

    $scope.update_user = function (data) {
        console.log(data);
        $mdDialog.show({
            controller: UpdateInformation,
            templateUrl: 'template/dialog1.tmpl.html',
            parent: angular.element(document.body),
            data: data,
            // targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                $scope.getAllUsers();
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

        function UpdateInformation($scope, data) {
            $scope.user = data;
            $scope.add_user = function () {

                delete $scope.user["cpassword"];
                delete $scope.user["password"];
                $http({
                    method: 'POST',
                    url: '/updateUsers',
                    data: $scope.user,
                }).then(function successCallback(response) {
                    $mdDialog.hide();
                }, function errorCallback(response) {
                });
            }
        }
    }
    $scope.delete_user = function(usr)
    {
            var confirm = $mdDialog.confirm()
                  .title('Delete Confirmation')
                  .textContent('Do you really want to delete this User?')
                  .ariaLabel('Lucky day')
                //   .targetEvent(ev)
                  .ok('Yes!')
                  .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function() {
                $http({
                    method: 'POST',
                    url: '/deleteUsers',
                    data: usr,
                }).then(function successCallback(response) {
                    $scope.getAllUsers();
                }, function errorCallback(response) {

                });
            }, function() {
            });
    }
});