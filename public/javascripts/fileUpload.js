app.controller('fileUpload', function ($scope, $http, $cookieStore, $mdDialog,fileUpload,Upload) {

    $scope.uploadFile= function()
    {
if(!$scope.fileTitle)
{
    $scope.message = "Please Enter Title!!";
    return false;
}
        // $cookieStore.get('LoggedInuser');
       var file =  $scope.file;
        Upload.upload({
            url: '/uploadfile',
            file: file,
            data:{filetitle:$scope.fileTitle,user:$cookieStore.get('LoggedInuser')},
          }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function(data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            $scope.message = data.message;
            $scope.getAllFiles();
          }).error(function(data, status, headers, config) {
            console.log('error status: ' + status);
          });
    }

    $scope.getAllFiles = function () {
        $http({
            method: 'POST',
            url: '/getownfiles',
            data: {user:$cookieStore.get('LoggedInuser')},
        }).then(function successCallback(response) {
            console.log("Success : - ", response);
            $scope.AllFiles = response.data.files;
            console.log("Other data :- ", $scope.AllFiles);
        }, function errorCallback(response) {
            console.log("Error : - ", response);
        });

    }
    $scope.getAllFiles();

    $scope.deleteFile = function(file)
    {
        if(confirm('Do you really want to delete this record ?')){
            $http({
                method: 'POST',
                url: '/deleteFile',
                data: {id:file.f_id},
            }).then(function successCallback(response) {
                console.log("Success : - ", response.data.message);
                $scope.deleteMessage = response.data.message;
                $scope.getAllFiles();
               
            }, function errorCallback(response) {
                console.log("Error : - ", response);
            });
        }
        else{
            return false;
        }
       

    }
});